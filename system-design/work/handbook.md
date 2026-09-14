# start | Start here | A reference you can learn from

This handbook follows the ten-topic roadmap we agreed on, starting with very basic experience and aiming at system design interviews. Read it in order on your first pass; afterward, use search and chapter links as a reference. There is no timetable. The aim is to make the mechanisms understandable enough that you can later reason through unfamiliar designs.

**Your new learning approach:** read the detailed notes, ask any LLM about confusing passages, and practice interviews after the conceptual pass. Each section has an “Ask a tutor” action that copies its text and your preferred tutoring instructions. Select a particular passage first to ask about only that passage. The handbook does not contact an AI service or send your notes anywhere.

Reading a chapter is evidence of exposure, not mastery. Use the status selector to distinguish “Reading,” “Read,” and “Can explain.” Keep questions in the chapter notes. Progress saves in this browser when local storage is available; browser profiles and file locations can affect persistence. Use **Export progress** to carry a backup between browsers or computers. Keep the HTML file and your exported progress together.

**Scope:** the agreed foundations, operational tradeoffs, an interview method, four worked designs, and a later practice bank. This is a substantial foundation, not an exhaustive catalog of every specialized system. Search engines, video pipelines, geospatial systems, deep consensus implementation, and role-specific low-level design are possible extensions. Real interviews vary by role and company.

All traffic figures, latency targets, schemas, and capacity assumptions in examples are invented for teaching. They are not vendor benchmarks. Architecture sketches show logical responsibilities; a box does not automatically mean a separate service or machine. Product documentation links support selected implementation details; the worked designs are instructional proposals, not claims about a company's production architecture. References checked September 15, 2026.

## How to read an unfamiliar concept

Ask four questions: what problem exists without this mechanism; what steps does it perform; what assumption makes it work; and what cost or failure does it introduce? “Redis makes it faster” misses all four. “A cache serves frequently requested product descriptions without another database read, but it can return an old description after an update” starts to answer them.

Follow each request through the system with your finger. At every arrow, ask whether the call can fail, time out, repeat, or arrive out of order. At every stored value, ask who owns it and whether it can be rebuilt. Those questions will eventually become your interview reasoning habits.

## A tiny running example

Imagine a small online shop. A visitor reads a product, adds it to a cart, places an order, and receives an email. Product browsing can tolerate a slightly old description. Placing an order must protect inventory. Email can arrive after the order response. Different actions in the same product therefore need different mechanisms and guarantees.

Do not add every component in this book to the shop immediately. Begin with an application and a database. Add a component when a requirement or observed bottleneck justifies its cost. The later chapters explain how to recognize that point.

# foundations | 01 · How applications work | Follow one request

## Clients, servers, and processes

A **client** requests a service; a **server** provides it. Your browser is a client when it asks for a product page. The shop's application acts as a server for that request. When the application asks a database for the product, it becomes a client of the database. These are roles in an interaction, not permanent labels for particular kinds of computers.

A **process** is a running program. Several server processes can run on one machine, and one application can run across many machines. An **instance** usually means one running copy of a service. A **port** helps the operating system deliver incoming network traffic to the appropriate endpoint. An IP address identifies a network destination; it is not necessarily a single permanent physical machine.

The **frontend** presents the interface and handles user interactions. The **backend** performs trusted business operations and accesses protected data. Browser validation can help a user correct a form, but the backend must validate the request again: clients can be changed or bypassed. The database stores information that must survive beyond a particular request or application process.

## What happens when you open a website?

Take `https://shop.example/products/42`. The browser interprets the scheme (`https`), hostname (`shop.example`), and path (`/products/42`). It may already have reusable information or a connection, so the following is a conceptual path rather than a claim that every page load repeats every step.

1. **Find the destination.** DNS resolves the hostname through cached information or a resolver to suitable address records. A DNS response can point toward infrastructure that serves many application machines.
2. **Establish secure communication.** Common HTTP/1.1 and HTTP/2 deployments use TCP and TLS. HTTP/3 uses QUIC over UDP with integrated TLS. TCP provides an ordered byte stream; TLS authenticates the server's identity through certificates and protects traffic in transit.
3. **Send a request.** The client sends a method, target, headers, and sometimes a body. Cookies or authorization information may accompany it.
4. **Route and process it.** A proxy or load balancer may choose an application instance. The application validates the request, checks permissions, and retrieves or changes data.
5. **Return a response.** A status code, headers, and optional body travel back. The browser renders the page and may make further requests for images, scripts, and data.

```diagram
Browser → DNS lookup → destination address
Browser ⇄ secure connection ⇄ edge / load balancer
                                 ↓
                            application ⇄ database
                                 ↓
                         response to browser
```

**Why this matters:** a slow page might be caused by network distance, connection setup, an overloaded application, a slow query, or a large image. Adding application servers addresses only some of those possibilities. Separate the stages before choosing an optimization.

HTTP communicates requests and responses, potentially through intermediaries. Its stateless request semantics do not prevent an application from maintaining user sessions. [Reference: MDN HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview).

## APIs are contracts

An **API** defines how a caller asks for an operation and interprets the result. For an HTTP API, the contract includes the endpoint, request fields, response fields, authentication, errors, pagination, and retry behavior. “We expose an API” is incomplete until a caller knows what a successful response promises.

```text
GET /products/42
→ 200 {"id":42,"name":"Desk lamp","price_minor":250000,"currency":"INR"}

POST /orders
Idempotency-Key: client-generated-operation-id
{"items":[{"product_id":42,"quantity":1}]}
→ 201 {"order_id":"o_123","status":"pending_payment"}
```

Representing money as integer minor units avoids many floating-point surprises; currency and its unit rules still need an explicit contract. Do not trust a client-supplied price as the authoritative charge. The server checks the applicable price and inventory.

GET retrieves a representation and should not be used to request a state-changing operation. PUT commonly replaces a resource at a known identifier; PATCH expresses a partial change; POST commonly creates a resource or invokes an operation; DELETE requests removal. Safe and idempotent are different ideas: an idempotent operation has the same intended effect when repeated, but its responses can differ. POST does not automatically become safe to retry because an HTTP library supports retries.

Useful response families: 2xx for successful handling, 4xx for problems with the request or access, and 5xx for server-side failures. `202 Accepted` means accepted for processing, not completed. `429` communicates rate limiting. A timeout gives no reliable conclusion about whether a state change occurred.

## Synchronous and asynchronous work

In a synchronous interaction, the caller waits for the result needed to continue. The order API may synchronously validate inventory and durably create an order. In asynchronous processing, it records work for later execution, such as sending an email. The immediate response must then describe the accepted state honestly.

Asynchronous does not mean faster completion or unlimited capacity. It moves waiting out of the immediate request and lets work be buffered. Users may need a job status endpoint, a notification, or an interface that shows “processing.” Failures must be retried or surfaced somewhere even though the original request has finished.

## Polling, streaming, and real-time connections

**Polling** repeatedly asks whether anything changed. It is simple, but the interval trades freshness against extra requests. **Long polling** keeps a request open until there is an update or a timeout, then the client reconnects. **Server-sent events** provide a server-to-client event stream over HTTP. **WebSockets** support bidirectional messages on a persistent connection.

A persistent connection consumes resources and can disappear when a device sleeps or a network changes. The application still needs authentication, reconnection, missed-event recovery, and sometimes heartbeats. Choosing WebSockets does not provide durable message history or delivery guarantees by itself.

## Sessions and trust

After login, an application may give the browser an opaque session identifier that refers to server-side session data, or a signed token containing claims. A signed token protects integrity; it is not automatically encrypted. Revocation, expiry, key rotation, and permission changes need deliberate treatment with either approach.

Authentication asks who you are. Authorization asks whether you can perform this operation on this specific resource. Knowing the URL of another person's order must not grant access to it. HTTPS protects the connection; it does not replace object-level permission checks.

**Common mistake:** assuming “the browser already checked it” makes backend authorization unnecessary. **Readiness check for later:** explain the route from clicking “place order” to a saved order, and distinguish the work that must finish before responding from the work that can happen afterward.

# goals | 02 · System design goals | Define what good means

## Functional requirements and quality requirements

Functional requirements describe actions: create a link, send a message, list orders. Quality requirements constrain the behavior: respond within a target, survive a machine failure, prevent duplicate charges, retain records for a defined period. A design can implement the right buttons while failing the quality requirements.

Clarify the important operations separately. For a shop, product descriptions might tolerate 30 seconds of staleness, while inventory reservation needs a concurrency rule that prevents overselling. “The system should be highly available and consistent” is too broad to choose a useful design.

## Latency, throughput, and bandwidth

**Latency** is elapsed time for one operation. **Throughput** is completed work per unit time, such as requests per second. **Bandwidth** is data transferred per unit time. A system can have high throughput and poor latency when it processes many concurrent requests, each slowly. Large responses may exhaust network capacity before request count becomes a problem.

Break response time into network travel, queue waiting, application processing, database work, and downstream calls. Sequential calls add to the critical path. Independent parallel calls can overlap, but the caller often still waits for the slowest required result. Parallelism also increases concurrent resource use.

Suppose most reads finish in 30 ms, but a few take 2 seconds. The mean can hide a bad experience. The median is the 50th percentile; p95 and p99 describe the latency thresholds that 95% and 99% of measured requests fall at or below. Always specify the operation and measurement window. A p99 target for one backend call is not automatically the same as a p99 target for an entire page.

Fan-out makes slow responses more visible. If a request needs 20 independent calls, and each has a 99% chance of meeting some threshold, the chance all meet it is approximately `0.99^20 ≈ 81.8%`. Real call latencies may be correlated, so this is an intuition-building calculation rather than a prediction.

## Availability, reliability, and durability

**Availability** concerns whether users can obtain the specified service. **Reliability** concerns correct operation over time under expected conditions. **Durability** concerns whether acknowledged data survives the failures the storage contract covers. A database can be unavailable while retaining every record. A service can respond quickly while returning incorrect data.

A **single point of failure** is a component whose failure can make the relevant service unavailable. Two application instances do not remove a single database or shared network dependency. A **failure domain** is a collection of things that may fail together: a process, host, rack, zone, or region. Replicas on one host do not protect against loss of that host.

An **SLI** is a measurement, such as the fraction of eligible requests served successfully within a threshold. An **SLO** is its target over a window. An **SLA** is a service agreement that can attach contractual consequences. An error budget is the allowed fraction of bad events implied by the SLO. Define exclusions carefully; excluding failures just to improve a metric defeats its purpose. [Reference: Google SRE on service-level objectives](https://sre.google/sre-book/service-level-objectives/).

For an uptime-based target, 99.9% over 30 days allows approximately 43.2 minutes of downtime. For a request-based SLO, the budget is failed requests, not minutes. Multiplying dependency availabilities gives a rough model only when dependencies are required and failures behave independently; shared failures and fallbacks can change the result substantially.

## Estimation without pretending to know production numbers

Start with the active users and their actions, not the total number of registered accounts. Imagine 1 million daily active users, each making 20 reads and 2 writes. That gives 20 million reads and 2 million writes per day. Divide by 86,400 seconds for average rates: about 231 reads/s and 23 writes/s. If we assume a 10× peak, the design target becomes roughly 2,315 reads/s and 231 writes/s.

If each write stores 1 KB, raw growth is about 2 GB/day, or 730 GB/year using 365 days and decimal units. Three full copies make that about 2.19 TB before indexes, logs, metadata, free space, backups, or compression. Retention might make a year the wrong horizon. If each read response is 5 KB, peak response payload bandwidth is about 11.6 MB/s before protocol overhead.

**Why calculate this?** To determine whether you have a large media problem, a high write-rate problem, a working-set memory problem, or none of those yet. Do not infer that a particular database cannot handle a rate without considering queries, hardware, indexes, payloads, and measurements.

## Concurrency, queues, and headroom

For a stable system, Little's Law relates average items in the system, arrival rate, and time in the system: `L = λW`. At 1,000 requests/s and 0.2 seconds average time, around 200 requests are in flight on average. This does not mean 200 CPU cores are needed; requests can spend much of their time waiting on I/O.

As utilization approaches effective capacity, small bursts and variations can create long queues. Autoscaling takes time to observe load and start instances, so spare capacity and admission control matter. Queuing work does not fix a sustained arrival rate above processing capacity. The backlog continues to grow until something changes.

## Tradeoffs are choices between concrete outcomes

Caching may reduce latency and database load while allowing stale reads. Synchronous cross-region replication may protect acknowledged writes against regional loss while adding distance-related delay and reducing availability during link failures. Denormalizing data may speed one query while complicating updates. Explain the gain, cost, and requirement that justifies the choice.

**Common mistake:** promising “zero latency, no data loss, always available, low cost” without naming failures or workload limits. **Readiness check for later:** write three measurable requirements for a chat app and explain how losing a typing indicator differs from losing an acknowledged message.

# storage | 03 · Databases and storage | Choose by access pattern

## Durable state and access patterns

A database manages stored information and the operations that read and modify it. A **source of truth** is the authoritative record for a fact. A cache or search index is often a derived representation that can be rebuilt. This distinction determines whether losing a component means slower service or permanent data loss.

Before choosing a database, list the questions the application must answer: fetch an order by ID; list a user's recent orders; find all unpaid orders older than an hour. These are **access patterns**. They shape keys, indexes, and sometimes duplicated data. “We have a lot of data” alone is not an access pattern.

## Relational modeling

A relational database organizes records in tables with defined relationships and constraints. A primary key identifies a row. A foreign key can enforce that a referenced record exists. A unique constraint prevents two rows from owning a value that should be exclusive. These are concurrency-safe mechanisms when enforced by the database, unlike a separate application check followed by a write.

```text
users(id, email UNIQUE, created_at)
products(id, name, current_price_minor, currency)
orders(id, user_id, status, total_minor, currency, created_at)
order_items(order_id, product_id, quantity, unit_price_at_purchase)
```

An order item stores the price at purchase because changing tomorrow's product price must not rewrite yesterday's order. This is deliberate historical data, not careless duplication. **Normalization** separates independently maintained facts to reduce inconsistent updates. **Denormalization** duplicates or precomputes information to make specific reads easier or faster. Ask how every duplicate will be updated or reconciled.

Joins combine related rows. They are not inherently unacceptable at scale; their cost depends on cardinality, indexes, the query plan, data placement, and workload. A distributed join across many shards is a different operational problem from an indexed join inside one database.

## Indexes: an extra structure with a maintenance cost

An index helps locate relevant rows without examining every row. Imagine an address book ordered by surname: finding a surname is much easier than scanning an unsorted pile. A B-tree-style index supports ordered lookups and ranges. A hash-style lookup is conceptually suited to equality, while inverted indexes map terms to matching documents.

For `WHERE user_id = ? ORDER BY created_at DESC, id DESC LIMIT 20`, an index on `(user_id, created_at, id)` may support the filter and ordering efficiently. Exact index options and traversal behavior depend on the database. A poorly ordered composite index may help one query but not another. Inspect the query plan rather than assuming every named field is sufficient.

Indexes consume space and require work on writes. An index on a field that matches almost every row may not make a broad query cheaper than scanning. Covering a query with indexed values can reduce additional row access, but enlarges the index. [Reference: PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html).

## Transactions and invariants

A **transaction** groups changes into a unit with specified correctness guarantees. ACID refers to atomicity, consistency, isolation, and durability. Atomicity means its changes commit together or not at all. Consistency here means preserving defined rules and constraints; it is not the same meaning as replica consistency in distributed systems. Isolation controls what concurrent transactions can observe. Durability concerns persistence after a successful commit under the database's configured guarantees.

Consider the last item in stock. Two callers each read `stock = 1`, both decide it is available, and both create an order. Merely wrapping the read and write in a transaction may not prevent this under the chosen isolation level. One possible implementation performs a conditional update and checks whether a row changed:

```sql
UPDATE inventory
SET stock = stock - 1
WHERE product_id = 42 AND stock > 0;
-- If exactly one row changed, create the order in this transaction.
-- Otherwise, report unavailable. Roll back if order creation fails.
```

The invariant is “stock must not go below zero,” enforced by the actual write condition and transaction design. Multi-item orders require all relevant changes to succeed together or a defined reservation workflow. Concurrent access can also deadlock; applications must handle transaction failures and retry safely where appropriate.

**Optimistic concurrency control** reads a version and updates only if that version still matches. If another writer changed it, retry or return a conflict. **Pessimistic locking** holds an appropriate lock while deciding and updating. Optimistic control can work well with infrequent conflicts; heavy contention can cause many retries. Locks avoid some conflicts but introduce waiting and deadlock concerns.

## Isolation levels without memorizing a slogan

At Read Committed, successive queries can observe newly committed changes from other transactions. Repeatable Read provides a more stable view, but exact guarantees vary by database. Serializable aims for outcomes equivalent to some serial execution, which can require aborting and retrying transactions. PostgreSQL's Repeatable Read can still admit serialization anomalies, while Serializable can reject conflicting executions. [Reference: PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html).

For two on-call doctors, each might see the other still on call and independently go off duty. A stable snapshot alone does not necessarily enforce “at least one doctor remains on call.” Identify the invariant, then choose locking, constraints, or isolation that actually protects it. Do not treat a transaction keyword as a universal concurrency solution.

## SQL and NoSQL are broad categories

| Model | Natural fit | Questions to ask |
| --- | --- | --- |
| Relational | Related data, constraints, varied queries, transactional changes | What indexes, isolation, and scaling approach fit? |
| Key-value | Fetch or update by a known key | Are ranges, relationships, or multi-key transactions needed? |
| Document | Retrieve an aggregate with nested fields | Which fields are indexed, and how large can documents grow? |
| Wide-column | Large partitioned datasets with planned key-based access | Can a partition become too large or too hot? |
| Graph | Repeated traversal of relationships | How deep and selective are traversals? |
| Search index | Text retrieval and relevance ranking | How stale can results be, and where is authoritative data? |

SQL does not mean “cannot scale”; NoSQL does not mean “no schema,” “no transactions,” or “always faster.” Products vary. State the required operations and guarantees first, then choose a model and validate the specific implementation.

## Object storage, files, and search

Large photos and videos are often stored as objects, while a database stores their IDs, owners, sizes, and processing state. The application can authorize a scoped upload or download and let the client transfer bytes directly to storage. That avoids routing every large payload through application servers. Handle abandoned uploads, size limits, access control, and cleanup.

A search index is usually a separate read-oriented structure, populated from durable source data. Updates may appear after a delay. If a user deletes a private document, a stale search result must not expose its contents; enforce access on retrieval and design deletion propagation. Backup is another separate concern: live replicas can replicate accidental deletion, so redundancy does not replace recovery copies.

## Pagination and schema changes

Offset pagination asks the database to skip an increasing number of rows and can shift under concurrent inserts. Cursor pagination continues after an ordering key such as `(created_at, id)`. Use a deterministic tie-breaker because many rows can share a timestamp. Decide whether the view is a snapshot or a moving feed; a cursor alone does not guarantee a frozen dataset.

Schema changes must tolerate old and new application versions overlapping during deployment. A common sequence is add a compatible field, deploy code that can use it, backfill carefully, switch reads, and remove the old field only after old readers and writers are gone. Backfills consume capacity and should be paced.

**Common mistake:** choosing storage from brand familiarity before writing the access patterns. **Readiness check for later:** explain the tables, indexes, and concurrent update rule needed to list a user's orders and safely buy the last item.

# scaling | 04 · Scaling an application | Add capacity where it helps

## Start with a simple baseline

A small system can be an application connected to a relational database, with object storage for media if needed. This baseline is understandable and easy to operate. First identify whether a problem is CPU, memory, disk I/O, network, connection count, lock contention, or an inefficient query. More application servers will not repair an unindexed query against the same overloaded database.

**Vertical scaling** gives a machine more resources. It can be operationally simple but has size limits, cost steps, and sometimes disruption. **Horizontal scaling** adds instances and distributes work. It introduces routing and coordination, and works best when individual requests can be handled independently.

## Stateless application instances

An application instance is stateless for routing purposes when a future request does not depend on private durable state held only by that particular instance. It can still use memory for temporary work and caches. Durable carts, sessions, and jobs need a shared or recoverable home.

Suppose instance A keeps your cart only in its memory. If the next request reaches B, the cart appears empty; if A crashes, it may be lost. A shared database can hold the cart while either instance handles requests. Sticky routing keeps a user attached to A and may be useful for some workloads, but it does not make A's memory durable and can create uneven load.

```diagram
                    ┌→ application A ─┐
Client → balancer ───┼→ application B ─┼→ database
                    └→ application C ─┘
                         shared durable state
```

## Load balancing and health

A load balancer distributes traffic across eligible backends. Round robin rotates through them; least-connections considers current connections; hashing can route related requests consistently. None automatically accounts for every request's computational cost. Layer 4 routing works with transport information; Layer 7 routing can use HTTP information such as host or path.

Health checks help remove unusable instances. A liveness check asks whether a process is alive enough to recover; a readiness check asks whether it should receive traffic. Making every health check fail whenever one shared dependency is briefly slow can remove all capacity simultaneously. Choose what the check means.

When shutting down, stop taking new requests and allow a bounded period for in-flight work to finish. This is **connection draining** or graceful shutdown. Long-lived connections complicate rebalancing: adding a new server does not necessarily move existing WebSocket clients to it.

## Proxies, gateways, and service boundaries

A reverse proxy fronts backend services. An API gateway may centralize routing, authentication checks, quotas, and other cross-cutting behavior. A load balancer's primary job is distribution; real products often combine these roles. Explain the responsibility rather than assuming each term requires another independent box.

A modular monolith keeps logical modules within one deployable application. Microservices split responsibilities into independently operated services. This can allow separate deployment and scaling, but introduces network failures, versioning, tracing, cross-service data ownership, and more operational work. “Many users” does not by itself imply microservices.

Service boundaries should reflect meaningful ownership and change patterns. Splitting every database table into a service often turns ordinary joins and transactions into fragile distributed workflows. Start with a boundary you can explain, and keep data ownership clear.

## Autoscaling and capacity planning

Autoscaling adjusts instance count based on a signal such as CPU, concurrency, or queue age. Pick a signal related to the bottleneck. CPU can be low while every request waits for a saturated database connection pool. Queue age may express worker urgency better than queue length if jobs vary greatly in cost.

If an instance sustainably handles 100 requests/s at the desired latency, a 900 requests/s peak needs more than nine instances when you reserve headroom and failure capacity. If one zone contains half the fleet, surviving its loss at the same service level may require substantial extra capacity. A benchmark at maximum throughput is not necessarily a safe operating target.

Scale-out can overload dependencies. Twenty instances with 100 database connections each could attempt 2,000 connections. Set connection budgets, bound concurrency, and consider pooling. Per-instance settings combine into system-wide load.

## Read replicas are not write scaling

A read replica can serve suitable reads from another copy of the data. With asynchronous replication, it may lag. Reading immediately after a write can show an old value unless the application routes that read appropriately or uses a consistency mechanism. Replicas still receive replicated writes; adding them does not automatically spread independent writes across shards.

Use caches or replicas for read bottlenecks when their semantics fit. Consider partitioning for data or write bottlenecks only after understanding its cost, explored in chapter 7. Often better queries, batching, or removing unnecessary work are the first improvements.

## Bottleneck reasoning

If 80% of response time is spent in a database call and application execution is made twice as fast, total latency only improves from 100 units to 90. Optimize the part that dominates the user-visible path. Also distinguish average resource utilization from a single hot key or lock: one serialized operation can limit the whole system while most machines look idle.

**Common mistake:** multiplying servers while leaving the actual limiting resource unchanged. **Readiness check for later:** explain what happens to carts, in-flight requests, and database connections when an application instance is added or removed.

# caching | 05 · Caching and content delivery | Faster reads, extra copies

## What a cache changes

A cache stores a reusable result closer to the caller or in a cheaper-to-access form. It could hold a database row, rendered page, computed recommendation, or image. A **hit** finds a usable entry; a **miss** requires fetching or computing the result elsewhere. The **working set** is the subset actively used over the relevant period, which may be much smaller than all stored data.

Ask whether repeated requests reuse the same result. A public product description is reusable across many people. A highly personalized result may have little sharing. If generating a key or contacting the cache costs almost as much as the original operation, the gain may be small.

An in-process cache avoids a network hop but is private to an instance and disappears on restart. A shared remote cache coordinates reuse across instances but adds a dependency and network overhead. Neither becomes the source of truth just because it is fast.

## Cache-aside, step by step

In cache-aside, the application checks a cache first. On a miss it reads the database, fills the cache, and returns the value. Consider a product description with a 60-second expiration time:

```diagram
Request → cache lookup ── hit → return cached product
                     └── miss → read database
                                      ↓
                                 fill cache → return product
```

The hit ratio is hits divided by eligible lookups. For a simplified serial path with a 2 ms cache lookup and 20 ms database read, 90% hits give expected lookup time `0.9×2 + 0.1×(2+20) = 4 ms`, excluding cache-fill and other work. More consequentially, approximately 10% of these reads reach the database during steady operation. A cold cache can abruptly reverse that reduction.

## Updates and the stale-fill race

A common write strategy updates the authoritative database, then invalidates the cache entry. But a race remains: reader A misses and reads the old database value; writer B commits a new value and invalidates the cache; A then fills the cache with the old value. “Delete the cache after writing” is useful, but not a proof of immediate freshness.

Possible responses include tolerating bounded staleness, coordinating fills and writes, attaching monotonic versions with an appropriate validation mechanism, or bypassing the cache for correctness-critical decisions. Each solution has costs. A TTL limits how long an entry remains cached after its insertion; it does not by itself bound end-to-end staleness when the source is a lagging replica or obsolete values can be reinserted.

For the shop, cached product descriptions may be acceptable, but checkout should validate the actual price and available inventory against the authoritative operation. A browse-page number is not an inventory reservation.

## Other write strategies

**Write-through** updates the cache as part of the write path, usually alongside backing storage. Clarify ordering, failure handling, and whether there is any actual atomicity across the two stores. **Write-behind** accepts a change into a buffering layer and persists later; it can improve write latency but risks data loss or reordering unless the buffering and replay system provide the required guarantees. **Read-through** places miss-loading behavior behind the cache abstraction rather than directly in application code.

The label alone does not answer “what happens if the process dies between the two writes?” Trace both success and failure before choosing the strategy.

## Expiration, eviction, and invalidation

Expiration removes usability after a time rule. Eviction removes entries to reclaim capacity. Invalidation removes or marks data because it changed. LRU-like policies prioritize recently used entries; LFU-like policies consider access frequency. Real implementations may approximate these policies. Redis supports different eviction policies under configured memory limits, and the appropriate policy depends on the workload and whether keys have expirations. [Reference: Redis eviction](https://redis.io/docs/latest/develop/reference/eviction/).

Short TTLs increase freshness but reduce reuse. Long TTLs improve reuse but can extend stale reads. A cache key must include everything that changes the result: tenant, permissions context where relevant, language, query parameters, and data version. Omitting the tenant can leak one customer's data to another.

## Stampedes, hot keys, and negative caching

A **cache stampede** occurs when many callers miss or expire together and all fetch the same underlying result. Coalescing concurrent loads lets one fetch serve many waiting callers. Randomizing expirations spreads refresh work. Serving a stale value while refreshing can help if that staleness is acceptable. Bound the wait and recover if the loader fails.

A **hot key** receives disproportionate traffic. Sharding by key does not divide one key's requests across owners automatically. Local caches, controlled replication, or changing the access pattern can help. A single globally popular item can stress one shard even when average traffic per shard looks small.

**Negative caching** remembers that an item does not exist, reducing repeated misses. Use a suitable short lifetime and invalidate when creation occurs if necessary. Otherwise a newly created object may appear missing. Bound cacheable keys so arbitrary requests cannot consume unbounded memory.

## CDNs and HTTP caching

A content delivery network serves cached content from geographically distributed locations. The origin remains responsible for generating or storing the authoritative content. Static assets with content-based versioned names are particularly convenient: changing the content changes the URL, so old cached bytes do not need to become the new bytes.

HTTP caching rules include freshness lifetimes and validators such as ETags. `no-cache` allows storage but requires revalidation before reuse; `no-store` instructs caches not to store the response. Shared caches need correct handling of private and varying responses. These directives have distinct semantics rather than simply meaning “turn caching off.” [Reference: MDN HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching).

## What happens when the cache fails?

Falling back to the database seems natural, but a database sized for only the miss traffic may collapse under the full request rate. Protect it using bounded fallback concurrency, admission control, gradual cache warmup, or degraded responses where permitted. The cache can be optional for data correctness while being essential for serving peak load.

**Common mistake:** calling caching a free optimization. **Readiness check for later:** trace a stale-fill race and explain which user operations can tolerate it.

# asynchronous | 06 · Background processing | Decouple work without losing it

## Queues, producers, and workers

A producer creates work; a queue buffers it; a worker consumes and processes it. For the shop, placing an order can persist the order before an email worker contacts a provider. This isolates the checkout path from temporary email slowness and allows a controlled number of workers to process a burst.

A queue changes the failure model. Work might wait, be delivered again, become malformed, or fail permanently. You now need job identity, attempts, timestamps, state, and operational visibility. A response saying “accepted” must correspond to a durable acceptance point if losing accepted work is unacceptable.

## Queue versus publish-subscribe versus log

A work queue commonly distributes jobs among competing consumers so each job is handled by one worker at a time, subject to redelivery. Publish-subscribe distributes events to multiple subscriptions: an order event may feed email, analytics, and fulfillment independently. A retained log stores an ordered sequence that consumers track with positions and can often replay.

These are models, and products can combine them. An event describes something that happened, such as `OrderCreated`; a command asks for work, such as `SendReceipt`. Distinguishing them helps avoid making every consumer believe it exclusively owns a business action.

## Acknowledgments and duplicate work

Suppose a worker receives an email job, sends the email, and crashes before acknowledging completion to the queue. The queue cannot know that the external side effect happened, so it may deliver again. If the worker acknowledges before sending and crashes afterward, the email can be lost instead.

At-most-once processing may lose work rather than retry. At-least-once delivery retries but can repeat work. “Exactly once” must name its boundary: updating a database once, processing within a stream system once, and sending an external email once are different claims. Kafka provides scoped transactional processing semantics, but external side effects still require coordination with the destination. [Reference: Apache Kafka design](https://kafka.apache.org/40/design/design/).

## Idempotent consumers

Give each operation a stable identifier. A consumer writing to one database can insert that identifier into a table with a unique constraint and perform the corresponding state update in the same transaction. If the identifier already exists, it can avoid reapplying the update. A separate “check if processed” followed by an unrelated write has a race and a crash gap.

For an external provider, a local deduplication table does not atomically cover the provider's action. Prefer a provider-supported idempotency key and retain the outcome for reconciliation. If the provider offers no such mechanism, acknowledge the remaining ambiguous failure window. Do not promise guaranteed duplicate-free email simply because you added a queue.

## The dual-write problem and transactional outbox

Writing an order to a database and publishing an event to a broker are two separate operations. A crash between them can leave an order without an event; reversing the order can publish an event for an order that never commits. An outbox writes both the order and an event record in one database transaction. A relay later publishes committed event records. The relay can publish duplicates, so consumers still need idempotency. [Reference: transactional outbox](https://docs.aws.amazon.com/en_en/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html).

```diagram
Order request → database transaction
                  ├─ order row
                  └─ outbox event row
                         ↓ relay (can retry)
                       broker → email / fulfillment consumers
```

An outbox provides a durable intent to publish; it does not remove monitoring or retention decisions. Track relay lag and clean published records safely. Consumers must understand event schema versions. Change data capture, or CDC, observes database changes and can support event propagation, but it also needs ordering, replay, and schema handling.

## Retries, dead letters, and ordering

Retry transient failures with delay and a limit. A malformed payload will not become valid after a thousand retries. A dead-letter queue stores failed jobs for investigation or controlled reprocessing. It is not success: someone or something must inspect, fix, and replay or discard those jobs deliberately.

Many queues use a visibility timeout or lease while a worker handles a job. If work exceeds it, another worker may receive the same job. Choose a suitable timeout or heartbeat extension, but still assume duplicates can occur. Worker crashes and uncertain network outcomes remain possible.

Parallel workers can complete jobs out of order. If order matters per account, route that account's events to an ordered partition or use sequence numbers with a defined conflict rule. Global ordering is more expensive and often unnecessary. Retrying an old event must not undo a newer state transition; state versions or monotonic transitions can help.

## Backpressure and backlog arithmetic

If arrival rate is 500 jobs/s and workers finish 400 jobs/s, backlog grows by 100 jobs/s: 360,000 jobs in an hour. If capacity later rises to 700 jobs/s while arrival remains 500, the backlog drains at 200 jobs/s, taking 1,800 seconds for those 360,000 jobs. The original 700 figure is not the drain rate because new work continues arriving.

Backpressure slows producers or limits accepted work to protect consumers. Also limit queue storage, payload size, job lifetime, and per-tenant load. Separate urgent transactional jobs from bulk campaigns when they need different latency guarantees. Otherwise a large newsletter can delay a password-reset email behind it.

**Common mistake:** claiming “the queue guarantees delivery” without describing durable acceptance, acknowledgments, retries, and external side effects. **Readiness check for later:** explain each crash point between saving an order and sending its receipt.

# distributed | 07 · Distributed data | Copies, partitions, and disagreement

## Why distribution is difficult

When one program changes one local value, it can often inspect a clear result. Across machines, a timeout can mean the other machine failed, the request was lost, the response was lost, or processing is merely slow. Machines also restart independently and do not share a perfectly synchronized clock. Distributed design manages these uncertainties rather than assuming them away.

Start by distinguishing **replication**, which stores copies of data, from **partitioning**, which splits different subsets of data across owners. A system may partition its data and replicate each partition. They solve different problems and can coexist.

## Replication: who accepts writes?

With a single leader, writes go through one authority and followers receive changes. This simplifies ordering for the leader's scope. Synchronous replication waits for a specified set of replicas before acknowledgment; asynchronous replication acknowledges before some replicas have received or persisted the change. Define what is acknowledged and which failures the guarantee covers.

Asynchronous replication usually reduces waiting but can lose acknowledged writes if failover promotes a replica that never received them. Synchronous replication can reduce that risk under its failure assumptions but may stop accepting writes when required replicas are unreachable. A replica's existence alone says little about the acknowledgment contract.

Multi-leader systems accept writes in multiple places and need a conflict strategy. Leaderless designs can write to multiple replicas with specified read/write participation. These approaches can improve locality or tolerate some failures, but conflict handling, repair, and versions become central. “Use several writable replicas” is the start of a design question.

## Consistency as observable behavior

**Linearizability** makes individual operations appear to occur atomically in an order that respects real time. If a write finishes before a read begins, the read must reflect that write or a later one. This is useful for exclusive ownership and some coordination decisions. It can require waiting or rejecting operations when sufficient communication is unavailable.

**Eventual consistency** means replicas converge if updates stop and the system's propagation and conflict-resolution assumptions hold. It does not specify a maximum delay by itself. **Read-your-writes** helps a user see their own accepted updates. **Monotonic reads** prevent a session from going backward to older versions. These session guarantees can matter even when all users do not see one globally immediate state.

For a profile edit, temporary staleness for other people may be acceptable while the editor should see their change. For reserving the final ticket, concurrent requests need a common ownership rule. Match guarantees to the operation instead of assigning one vague “consistency” setting to the whole product.

## CAP with the actual failure condition

In the formal CAP setting, a network partition can prevent nodes from communicating. A system cannot then guarantee both linearizable behavior and the formal availability property for every request to a non-failing node. A node that cannot coordinate may have to reject or delay an operation to preserve consistency, or answer without that guarantee. CAP availability is not identical to an uptime SLO. [Reference: Gilbert and Lynch's CAP paper](https://www.cs.princeton.edu/courses/archive/spring22/cos418/papers/cap.pdf).

“Pick any two” is a misleading everyday selection rule. Network separation is a condition to handle, and the choice can differ across operations. Even without a partition, stronger coordination can cost latency; CAP does not quantify every normal-operation performance tradeoff.

## Quorums and their limits

For a fixed set of N replicas, a write reaching W replicas and a read consulting R replicas overlap when `R + W > N`. With N=3, W=2 and R=2, at least one replica participates in both sets. That overlap alone does not prove linearizability: concurrent writes, version selection, failed partial writes, and changing or alternative replica sets all matter. Dynamo is an example of a design that explores availability, versioning, and reconciliation tradeoffs. [Reference: Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf).

Do not quote quorum arithmetic as a guarantee while leaving the read algorithm undefined. The system must know which version to return and how to resolve conflicts. Last-write-wins based on wall clocks can discard meaningful concurrent changes when clocks disagree or writes race.

## Consensus and safe leaders

Consensus helps a group agree on a sequence of decisions despite certain failures. A consensus-backed replicated log can establish a leader and committed operations under its assumptions. Majority-based systems can continue only when the required majority can communicate; three voters typically tolerate one unavailable voter, while five tolerate two. Raft explains this through leader election, log replication, and safety rules. [Reference: Raft paper](https://raft.github.io/raft.pdf).

Leader election alone does not make an old leader harmless. A paused leader may wake up and continue acting. A fencing token is a monotonically increasing authority number that a protected resource checks, rejecting operations from older authorities. This is stronger than merely hoping an expired lock holder notices that its lease ended.

## Partitioning and shard keys

A shard owns some subset of records. Hash partitioning spreads keys by a hash and often balances ordinary key lookups well. Range partitioning groups nearby values, helping range scans but potentially concentrating new writes at one end. Partitioning by tenant can simplify isolation but create a huge shard for a huge tenant.

Choose a shard key from access patterns and load distribution. Partitioning chat history by conversation makes reading one conversation natural, but an exceptionally busy conversation can become hot. Partitioning only by user may make group conversation reads awkward. A key should be examined for data size, read load, write load, and growth.

Cross-shard queries can scatter to many owners and combine results, increasing latency and operational complexity. Cross-shard transactions need coordination or a workflow that tolerates intermediate states. Unique constraints may only be local unless the system provides a global mechanism.

## Resharding and consistent hashing

Simple `hash(key) mod shard_count` changes many assignments when the count changes. Consistent hashing maps keys and owners into a space that can reduce remapping as owners change. Virtual nodes can spread ownership more evenly. This is useful for some caches and distributed stores, but it does not cure a single hot key.

Moving durable data requires more than updating a formula. Copy records, capture concurrent changes, verify catch-up, switch ownership without losing writes, and eventually remove old copies. Routing metadata needs a consistent transition. “We will shard later” is reasonable only if you understand which data and API assumptions make that migration possible.

## Multi-region and recovery

Multiple regions can reduce user distance and survive regional incidents, but write authority becomes harder. An active-passive design usually has one write region and a recovery region. Active-active designs accept traffic in several regions but need explicit data ownership, consistency, and conflict behavior. Cached local reads are easier to distribute than strict global write coordination.

**RPO**, recovery point objective, is the acceptable amount of data loss measured backward in time. **RTO**, recovery time objective, is how long restoring service may take. Backups, restore procedures, routing changes, dependency readiness, and capacity all affect recovery. Test restores: a successful backup job does not prove a usable recovery path.

**Common mistake:** equating replicas with backups or eventual consistency with a guaranteed one-second delay. **Readiness check for later:** explain what your system does when the leader is unreachable and why a stale replica may be unsafe to promote.

# resilience | 08 · Protecting a system | Make failure bounded and visible

## Timeouts are part of the contract

Every remote call needs a bounded wait. Otherwise slow dependencies can retain threads, memory, and connections until the caller is also unavailable. Distinguish connection setup timeouts from request or overall deadlines. A request with a 500 ms end-to-end budget cannot safely spend 500 ms at every one of three sequential dependencies.

Propagate remaining deadlines where possible. Set values from expected latency distributions and service objectives, then measure false timeouts and actual resource usage. Cancellation can stop unnecessary work, but it may not undo a committed operation. A client timeout means the outcome is unknown, not that the operation never happened.

## Retries can amplify an outage

Retry when the operation and error permit it, with capped attempts, backoff, jitter, and an overall budget. Jitter spreads retry timing so clients do not surge together. If five layers each make three total attempts, one user request can cause as many as `3^5 = 243` calls at the deepest layer. Prefer a deliberate retry location. [Reference: AWS on timeouts, retries, backoff, and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/).

Retrying a validation error usually wastes resources. Retrying a write after a timeout can duplicate a side effect. Even reads can worsen overload when retried aggressively. Observe retry volume separately from original request volume.

## Idempotency keys as a user-operation identity

A caller supplies the same unique key when retrying the same intended operation. The server scopes it to the caller and operation, stores the request's relevant identity and result, and returns a compatible result on a repeat. A key reused with different parameters should be rejected or handled by an explicit contract. Retention must cover the promised retry window. [Reference: AWS on idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/).

For a database-only order creation, a unique key and transaction can atomically record the order and its idempotency result. Simultaneous requests with the same key require coordination: do not let both pass a pre-check and create separate orders. For payment providers, propagate a stable provider key and reconcile uncertain outcomes rather than issuing a new charge blindly.

## Circuit breakers, bulkheads, and load shedding

A circuit breaker temporarily stops ordinary calls to a repeatedly failing dependency, then cautiously probes recovery. It can fail fast and reduce useless pressure, but its thresholds and fallback need testing. A global breaker can be too broad if only one tenant or endpoint is unhealthy.

Bulkheads isolate resource pools: bulk email should not consume every worker needed by transactional email. Load shedding rejects lower-priority or excess work before saturation destroys useful throughput. Graceful degradation preserves core functionality, such as showing a chronological feed if ranking is unavailable. A fallback is only safe if its semantics are acceptable; an invented payment success is never a valid fallback.

## Rate limiting and quotas

Rate limits constrain request activity over time; quotas may constrain total usage over longer periods. Limit by a meaningful identity such as user, tenant, API key, endpoint, or a combination. IP-only limits can penalize many users behind one network and can be evaded by distributed clients.

| Algorithm | How it works | Main tradeoff |
| --- | --- | --- |
| Fixed window | Count requests in a defined interval | Simple; boundary bursts can exceed the intended short-term rate |
| Sliding log | Keep request timestamps for the moving window | Precise but uses memory and cleanup work per request |
| Sliding counter | Approximate recent usage with time buckets | Lower overhead, approximate boundary behavior |
| Token bucket | Refill tokens at rate r up to capacity b; requests spend tokens | Allows a controlled burst while bounding long-run rate |
| Leaky bucket | Drain accepted work at a controlled rate | Smooths output, but buffering adds delay and needs bounds |

For a token bucket with capacity 100 and refill 10/s, a full bucket can admit a burst of 100 requests, then sustainable admissions approach 10/s for one-token requests. Distributed updates need atomicity. Per-instance buckets multiply the allowance unless coordinated or intentionally divided. Decide whether a limiter outage permits traffic or rejects it based on the protected operation.

## Observability: know what users experience

Metrics summarize numeric behavior: request rates, latency distributions, errors, saturation, queue age, and replication lag. Logs record individual events with context. Traces connect work across service boundaries using a propagated identifier. They answer different questions; collecting one does not replace the others.

Alert on user impact and actionable precursors. High CPU may be healthy during efficient work; a rising oldest-job age can reveal a delivery problem even with moderate CPU. Track business correctness signals such as orders stuck in a transition or a mismatch between provider payments and internal records. Avoid including secrets and private payloads unnecessarily in logs.

Use bounded metric labels. A separate label for every request ID can create excessive metric cardinality. Put high-cardinality detail in appropriate logs or traces instead. Sampling reduces volume but can miss rare failures unless designed carefully.

## Deployments and recovery are design work

A rolling deployment replaces instances gradually. A canary sends a small portion of traffic to a new version and compares relevant outcomes before expanding. Blue-green deployment keeps two environments and switches traffic. All need rollback criteria, capacity, and compatibility with overlapping versions and schema changes.

Exercise failure scenarios: kill an instance, delay a dependency, exhaust a pool, restore a backup, and replay a job. The goal is evidence that the design behaves as claimed. A disaster recovery document that has never been exercised is an untested hypothesis.

## Security and resource ownership

Apply least privilege to service identities, keep secrets outside source code, encrypt sensitive traffic and storage as required, and validate inputs. Authorization belongs at resource access points even if a gateway authenticated the caller. Signed object URLs should have appropriate scope and expiry. Public short links are identifiers, not a substitute for access control on private data.

Design tenant isolation, deletion propagation, and retention deliberately. A user deletion may need to affect the database, search index, caches, exports, and backup retention policy. “Deleted from the primary table” does not describe the entire lifecycle.

**Common mistake:** treating monitoring and recovery as details to add after the architecture. **Readiness check for later:** explain how a slow dependency is prevented from taking down every request, and how you would detect that it is doing so.

# interviews | 09 · The interview approach | Build a reasoned proposal

## Clarify before drawing

An interview prompt such as “design chat” leaves many valid products open. Ask about one-to-one versus group chat, expected group size, history, offline delivery, attachments, message order, and delivery expectations. Then state the scope you will design. Clarification is a way to make decisions defensible, not a ritual list of questions unrelated to the architecture.

Identify the core user journeys and the most important quality requirements. If the interviewer does not specify scale, propose illustrative assumptions and invite correction. Say which assumption changes the design: enormous groups affect fan-out; global strict ordering affects coordination; large attachments affect bandwidth and storage.

## Estimate only what informs a decision

Calculate average and peak request rates, payload sizes, retention, and any unusual fan-out. Keep units visible. Read requests per day are not requests per second; concurrent connections are not daily active users. A rough correct magnitude is more useful than precise arithmetic built on an irrelevant assumption.

Capacity numbers do not prove a design can meet its target. Identify what you would benchmark: a query shape, the connection gateway's memory usage, or a worker's provider-limited throughput. Explain the headroom needed for a failure as well as the steady-state capacity.

## State APIs and data ownership

Sketch the few APIs that express the core journeys and the records that support them. Mark unique keys, ordered query keys, and any operation that must update several records atomically. Name the source of truth for each important fact. Distinguish accepted, committed, delivered, and read states instead of treating them all as “success.”

For distributed workflows, list the states explicitly. An order might move through pending, reserved, paid, fulfilled, cancelled, or refunding. A **saga** coordinates a sequence of local transactions with compensating actions when later steps fail. Compensation is a new business action, such as releasing stock or issuing a refund; it does not magically erase an external effect or restore every observation of the past. Compensation can fail and needs retry and reconciliation.

## Draw a baseline and trace the paths

Begin with the fewest components that meet the requirements. Trace a write from request to durable acknowledgment, then trace a read from request to returned data. Add asynchronous side effects afterward. Name the purpose of every box and arrow. If you cannot explain a component's specific job, reconsider whether it belongs.

Then ask where load concentrates and where failure creates unacceptable behavior. Add a cache because repeat reads strain storage and staleness is acceptable. Add a queue because a side effect can be delayed and needs durable retry. Add partitioning because the data or write workload requires distribution. These are causal explanations an interviewer can challenge.

## Go deep where the design is distinctive

A URL shortener needs collision-safe identifiers and a fast redirect path. Chat needs connection routing, per-conversation ordering, and reconnect recovery. A feed needs a fan-out strategy. Spend depth on those mechanisms rather than repeating the same list of generic components in every case.

Useful deep-dive questions include: what if the response is lost after a commit; what if one key becomes 100 times hotter; what if a replica is a minute behind; what if a worker runs twice; what if a whole zone disappears? Trace one scenario precisely instead of saying “we add redundancy.”

## Explain decisions with a reusable sentence structure

“Because [requirement], I would use [mechanism]. It works by [important steps]. This costs [latency, complexity, money, or weaker guarantee]. If [changed condition], I would reconsider [alternative].” This structure forces the connection between the requirement and the component.

Example: “Because receipts can arrive after checkout, I would publish durable email work through an outbox and queue. Workers can retry without blocking the order response. This adds eventual delivery and duplicate-handling concerns. If immediate confirmation is legally or operationally required, I would clarify the acceptance contract and provider constraints.”

## What to avoid

Do not open with brand names. Do not claim one database handles every workload or that microservices solve scale automatically. Do not draw redundant boxes without explaining failover. Do not promise exactly-once external actions without an actual coordination mechanism. Do not make the design more complicated just to use every concept in the handbook.

If you are uncertain, state the assumption and what you would verify. “I expect the query to use this composite index, and would confirm the plan under realistic data distribution” is stronger than inventing a benchmark. Interview readiness comes from explaining and adapting a design, which is why the later practice stage matters.

# cases | 10 · Worked case studies | Read the decisions, not just the boxes

The next four chapters apply the foundations. Each is one defensible proposal under explicit invented requirements. Read requirements first, follow the request paths, then examine the failure cases. These are teaching designs rather than production descriptions of named companies.

| Case | Main lesson | Prerequisites |
| --- | --- | --- |
| URL shortener | Key generation, read-heavy paths, cache semantics | Chapters 1–5 and 7–8 |
| Notification service | Durable jobs, retries, provider ambiguity | Chapters 3, 6, and 8 |
| Chat | Persistent connections, ordering, reconnect recovery | Chapters 1, 6, and 7 |
| News feed | Fan-out, derived views, freshness and authorization | Chapters 3, 5–8 |

You can inspect the later practice bank without answering it yet. Read solutions as examples of reasoning, then eventually close them and construct your own proposal. Memorizing a diagram will not prepare you for a changed requirement.

# url-shortener | 10A · URL shortener | A read-heavy system

## Scope and scale

We allow authenticated users to create short links and optional expiration times. Anyone with a public link can resolve it. We exclude custom aliases initially. Assume 1 million new links/day and 100 million redirects/day, with a 10× peak. That is about 12 average creations/s and 1,157 average redirects/s, or approximately 116 and 11,574 at the assumed peak.

Assume 500 bytes per link record including its stored fields for rough planning: 0.5 GB/day and about 182.5 GB/year raw. Indexes, copies, and backups add space. The scale suggests an asymmetric design: redirects need more capacity than creation. We target p99 service latency under 100 ms for redirects in the chosen serving region, excluding client network time; this is a teaching target that would need measurement.

## API and records

```text
POST /links {destination, expires_at?}
→ 201 {code, short_url}

GET /{code}
→ redirect response with Location header, or 404/410

links(code PRIMARY KEY, owner_id, destination, created_at,
      expires_at, disabled_at, version)
```

Validate allowed URL schemes and size. Public redirect services need abuse controls and a takedown path. If the application later fetches destinations for previews, that creates an additional server-side request safety problem; the redirect-only design does not need to fetch the destination itself.

## Generating a short code

One option is a random base62 code using digits and letters. Eight characters provide `62^8 ≈ 2.18×10^14` possibilities. That does not mean collisions can be ignored: for n random draws, the expected number of colliding pairs is approximately `n(n−1)/(2M)` while occupancy is low. At 100 million links, this is about 23 pairs for this space. A unique database constraint plus retry handles collisions correctly.

Another option encodes a unique numeric ID in base62. This avoids random collisions when ID allocation is correct, but predictable codes can reveal creation patterns and make enumeration easier. Distributed ID allocation introduces its own coordination or clock assumptions. Neither choice makes a public link an authorization secret.

## Architecture and create path

```diagram
Create client → balancer → link application → links database
Redirect client → balancer → redirect application → cache
                                                   └ miss → links database
Redirect application → bounded analytics path → analytics workers
```

Initially the two application roles can be modules in one deployment. On creation, authenticate, validate, generate the code, insert under the unique constraint, retry a collision, then return the committed link. If creation requests are retried after timeouts, an idempotency key can prevent accidental extra links when that matters to the API contract.

## Redirect path and freshness

Look up the code in cache, load from the database on a miss, check expiration and disabled state, then return a redirect. If links are mutable or revocable, a temporary redirect and deliberate cache controls provide more control than a permanently cached redirect. Browser and intermediary behavior must be considered; server-side invalidation cannot retract a destination already learned and cached by a client.

Cache entries should not outlive the link's expiration, and the serving path can also check the stored expiration. A newly created link read from a lagging replica may appear absent; use a suitable authoritative fallback or creation-aware routing. Keep negative caching short and account for newly created records.

## Failure and growth

A viral code becomes a hot key. Use cache capacity, possibly local reuse, and controlled request coalescing before assuming extra database shards will spread one key. If the cache disappears, limit fallback load and recover gradually. Analytics should not block a redirect when the product accepts delayed or approximate counts; if lossless analytics is required, durable capture becomes an explicit dependency or latency cost.

A single database may be sufficient for the stated creation workload with proper indexing and capacity, but this needs measurement. If storage or throughput eventually requires partitioning, hashing the code is a natural lookup distribution. Listing an owner's links then needs an owner-oriented index or separate view.

## Challenge: deletion must take effect immediately

Long-lived cached redirects conflict with strict immediate revocation. Define what “immediately” means and which clients are controllable. For future service lookups, shorten or bypass caches and consult revocation state with the required consistency, accepting extra load and latency. You cannot guarantee a user's browser forgets a destination it already received. The changed requirement changes the contract as well as the infrastructure.

**What this case teaches:** random identifiers still need collision handling; cache policy is part of link semantics; read-heavy scale does not automatically require distributed writes; and analytics reliability is a product decision.

# notifications | 10B · Notification service | Durable intent, uncertain delivery

## Scope and scale

Support transactional email, SMS, and mobile push, with user preferences and delivery status. Assume 10 million notifications/day and a 20× burst: about 116 average requests/s and 2,315 at peak. Distinguish provider acceptance from user receipt. We aim to accept valid requests durably and begin urgent delivery within a few seconds under normal conditions; provider availability and device behavior limit the end-to-end promise.

Bulk campaigns are a separate workload class so they cannot consume every resource needed by password resets. Exact capacity must account for provider quotas, number of recipients, retries, and channel-specific costs, not just inbound API requests.

## API and records

```text
POST /notifications
Idempotency-Key: operation-id
{recipient_id, channel, template_id, template_version, parameters}
→ 202 {notification_id, status:"queued"}

GET /notifications/{id} → authorized status view

notifications(id, requester_id, idempotency_key UNIQUE-with-requester,
 recipient_id, channel, template_version, status, created_at)
attempts(id, notification_id, provider, provider_message_id, outcome)
outbox(event_id, notification_id, payload, published_at)
```

The request's deduplication scope includes the requester; one tenant's key must not collide with another's. Preserve or reference immutable template versions so a delayed retry does not unexpectedly render a different message.

## Acceptance and dispatch

Authenticate the caller, validate the recipient and template, check the operation's eligibility, and commit a notification plus outbox event in one transaction. Return `202` after durable acceptance. A relay publishes work to channel and priority queues. Workers apply channel limits, check relevant current preferences, render, and contact a provider.

```diagram
Caller → notification API → database (notification + outbox)
                                     ↓ relay
                           priority / channel queues
                           ↓         ↓          ↓
                         email      SMS        push workers
                           └──────── provider APIs ────────┘
                                      ↓ callbacks
                                status updates
```

Some preference changes should suppress already queued work; define exceptions for messages that are mandatory for the service. Scheduled notifications need a due-time mechanism; a worker should not hold a job in memory for several days waiting to send it.

## Provider ambiguity and state transitions

If a provider accepts a message but its response is lost, blindly sending again can duplicate it. Use a stable provider idempotency key where supported. Otherwise record the ambiguous attempt and use provider lookup, callbacks, or reconciliation when available. Switching providers immediately after an uncertain response can also duplicate delivery.

Model statuses such as queued, sending, provider_accepted, delivered, failed, and suppressed. Not every channel can prove delivered. Callbacks can repeat or arrive out of order; authenticate them and apply deduplication and valid transition rules. A late “accepted” callback should not blindly overwrite a later “delivered” state.

## Backlog and failure handling

Retry transient provider failures with backoff and an expiry appropriate to the message. A one-time code that has expired should not keep retrying overnight. Permanent address failures should stop retrying. Dead-letter malformed or repeatedly failing jobs for review. Separate per-provider concurrency and rate budgets so one provider's slowness does not retain every worker.

For illustration, a worker sustaining 20 messages/s would require at least 116 workers for a 2,315/s burst if the burst had to be processed immediately, before headroom and provider quotas. Buffering can reduce immediate capacity needs only if the allowed delay and subsequent drain capacity support it. Measure oldest urgent-job age, not just total queue depth.

## Growth and decisions

Partition work by channel and priority first; introduce tenant fairness when one customer can flood the service. Keep sensitive template parameters out of broad logs and set retention. Track acceptance latency, attempt rates, provider errors, ambiguous outcomes, suppressed messages, and callback delay.

**Challenge:** “Guarantee exactly one SMS.” Ask what the provider supports and what “delivered” means. Your internal transaction cannot atomically control a telecom network. You can provide durable intent, stable identities, careful retries, and reconciliation; the external guarantee depends on actual provider capabilities.

**What this case teaches:** a queue is only one part of reliable delivery. Durable acceptance, channel policy, deduplication boundaries, uncertain outcomes, and honest status semantics form the complete reasoning.

# chat | 10C · Chat system | Delivery across disconnects

## Scope and scale

Support one-to-one and small-group text chat, persisted history, offline catch-up, and read receipts. Exclude calls and giant public channels. Assume 1 million daily active users, 50 messages per user/day, and 100,000 simultaneous connections. That is 50 million messages/day, about 579 average incoming messages/s, and about 5,787 at a 10× peak. Recipient fan-out adds work beyond those incoming messages.

At an assumed 1 KB per message record, raw message growth is about 50 GB/day before replicas, indexes, and attachments. State retention explicitly. Target normal online delivery within 500 ms in the chosen region as a teaching assumption; durability and ordering need definitions as well as a speed target.

## Data and connection roles

```text
conversations(id, type, created_at)
memberships(conversation_id, user_id, role, joined_at, left_at)
messages(conversation_id, sequence, message_id, sender_id,
         client_message_id, body, created_at)
read_positions(conversation_id, user_id, last_read_sequence)

POST /conversations/{id}/messages {client_message_id, body}
GET /conversations/{id}/messages?after_sequence=...
WebSocket events: message, acknowledged, delivered, read
```

A connection gateway holds live sockets. A routing registry records which gateway currently serves a user's devices, typically with expiry or heartbeats. This registry is ephemeral routing information; the durable message store is the recovery source when routing data is stale or a gateway crashes.

## Sending and durable acknowledgment

The client generates a stable message ID for retries. The receiving service authenticates the user, verifies membership, and routes to the conversation's write authority. That authority allocates a sequence and durably stores the message under a uniqueness rule for the sender's client message ID. It then acknowledges the accepted message and sequence. Retrying after a lost response returns the existing accepted message.

```diagram
Sender → connection gateway → conversation write authority
                                       ↓
                           message store + delivery intent
                                       ↓
                                routing / fan-out
                                       ↓
                              recipient gateways → devices
Offline or reconnecting device → history API → message store
```

Use an outbox or durable log boundary so a stored message does not silently lose its delivery intent. A server acknowledgment means stored under the agreed durability policy, not that the recipient saw it. Device delivery acknowledgment and explicit read position represent later states.

## Ordering and reconnect recovery

Per-conversation sequence numbers establish the chosen server order. Wall-clock timestamps alone do not give reliable ordering across machines. Concurrent senders may be ordered by acceptance at the conversation authority; make clear that this is not a promise to recover the unknowable real-world order of simultaneous keystrokes.

On reconnect, a client presents its last received sequence and fetches missing messages, then continues live updates. Replays and live events may overlap, so deduplicate by message identity or sequence. A client seeing a gap requests history rather than assuming the missing event never existed. Multiple devices track their delivery state independently, while product rules determine how read state is shared.

## Presence and attachments

Presence uses heartbeats and expiry and is usually approximate: a phone that loses connectivity cannot always announce departure. Typing indicators are ephemeral and can be dropped. Do not store and retry them like durable messages. These weaker guarantees reduce unnecessary load without weakening message history.

For attachments, authorize an object upload, store the object reference with the message, and manage scanning or processing state if required. Private attachments need access checks or scoped URLs; an unguessable identifier alone is not the entire security model.

## Failure and scaling

A gateway failure drops connections, so clients reconnect with jitter to avoid a synchronized surge. Durable history enables catch-up. Conversation-based partitioning keeps reads and ordering local, but a very busy conversation can become hot. Small-group scope makes fan-out manageable; giant groups would require a different distribution strategy.

Socket capacity depends on per-connection memory, traffic, heartbeats, file descriptors, and runtime behavior. If an illustrative gateway handled 10,000 connections, ten would cover 100,000 only without headroom or failures. Benchmarking and failure-domain planning determine the real fleet size. Monitor delivery lag, reconnect storms, store latency, duplicate rates, and gap recovery.

**Challenge:** the write authority fails after persisting a message but before acknowledging it. Retry with the same client ID; the new safe authority must discover the committed message rather than create another one. Failover consistency and deduplication are therefore linked.

**What this case teaches:** WebSockets transport messages; storage, ordering, stable IDs, membership checks, and replay make chat behave correctly across failures.

# feed | 10D · News feed | Compute now or later?

## Scope and scale

Users publish posts, follow accounts, and read a home feed. Begin with reverse chronological order and add ranking as an extension. Assume 1 million daily active users, 2 posts per user/day, and 20 feed reads per user/day: about 23 average posts/s and 231 average reads/s, with a 10× assumed peak.

Follower counts are uneven. An average hides celebrities and large accounts, which can dominate work. Feed freshness can be eventual, but access checks must prevent unauthorized reads. Media bytes live in object storage and a CDN where permitted; the feed holds references and metadata.

## APIs and records

```text
POST /posts {text, media_refs, visibility} → post_id
POST /follows {followee_id}
GET /feed?cursor=... → items, next_cursor

posts(post_id, author_id, created_at, visibility, body, deleted_at)
follows(follower_id, followee_id, created_at)
feed_entries(user_id, sort_key, post_id)
```

Access patterns require outgoing follows for a reader and incoming followers for a publisher. These may need separate indexes or derived structures. Keep authoritative post content separate from feed entries so editing a post does not require rewriting millions of copies of its text.

## Fan-out on read

When a user opens the feed, retrieve recent posts from followed accounts and merge them. This avoids writing a feed entry for every follower whenever a post appears. It is appealing when many recipients rarely read or when a publisher has millions of followers.

The cost moves to reads: a user following many accounts can require many lookups, merging, and filtering. Bound the candidate window and use appropriate author-time indexes. Calling one remote service sequentially for every followed account would create poor latency; batching and data locality matter.

## Fan-out on write

When a post commits, a durable event triggers workers to insert its ID into followers' feed lists. Feed reads can then fetch a ready list and hydrate the referenced posts. This speeds ordinary reads but creates write amplification and a potentially large backlog when popular authors publish.

If the 2 million daily posts each fan out to 200 recipients on average, that is 400 million feed-entry writes/day, about 4,630/s average. At an illustrative 32 bytes per entry, it is 12.8 GB/day of logical entries before storage overhead and replication. Follower skew means this average cannot size the worst bursts alone.

```diagram
Publish → posts database + outbox → fan-out workers → feed entries
                                                        ↓
Read → feed service → candidate IDs → hydrate posts → authorize → return
             ↑
       merge recent posts from high-fan-out authors when needed
```

## A hybrid proposal

Precompute feed entries for ordinary authors, possibly only for active recipients. Retrieve very high-fan-out authors' recent posts at read time and merge them. Choose the threshold from actual follower distribution, posting rate, reader activity, and infrastructure costs; there is no universal celebrity cutoff.

Feed entries are derived data. They can be rebuilt from posts and relationships under a defined retention and history policy. Duplicate fan-out events should not create duplicate entries: use a uniqueness rule on user and post identity. Worker checkpoints and retries need to tolerate partial batches.

## Freshness, privacy, and deletion

Fan-out lag means a new post may not appear instantly. For an author's own view, a direct recent-post merge can provide read-your-writes behavior. Follow and unfollow operations need defined semantics: should old posts remain, and should newly followed authors contribute past posts? Those policies affect backfills and filtering.

The precomputed list is not proof of present authorization. Recheck visibility, blocks, membership, or deletion on hydration using an appropriately fresh authority. Otherwise a previously public or visible post can leak after permissions change. Asynchronous cleanup of feed entries is useful but cannot alone satisfy strict immediate access revocation.

## Ranking and pagination

Ranking separates candidate generation from scoring. Fetch eligible candidates, compute or retrieve scores, apply diversity or product constraints, and return a page. Heavy ranking can have a chronological fallback if allowed. Features and scores can be stale; measure whether that is acceptable separately from privacy.

Chronological pagination can use a stable time-and-ID ordering. A ranked feed changes order as scores change, so a cursor alone does not guarantee no duplicates or omissions across pages. A feed session snapshot, stable candidate set, or explicit best-effort contract can make behavior coherent.

## Failure and challenge

If fan-out workers are delayed, serve existing entries and surface freshness through monitoring; a fallback to on-read computation must be bounded or it can overwhelm storage. Monitor fan-out age, hot publishers, read latency, candidate counts, and unauthorized-content filtering.

**Challenge:** an account with 20 million followers posts ten times in a minute. Pure eager fan-out creates 200 million recipient insertions before retries and overhead. A hybrid read path or selective precomputation controls that burst, at the cost of more merging during reads.

**What this case teaches:** moving computation between write and read paths changes amplification, freshness, and operational risk. A fast derived view still needs current authorization.

# deeper | Deeper mechanisms | Fill in the machinery

## Memory, disk, and the write-ahead log

Memory is useful for fast access but ordinary process memory disappears on restart. Persistent storage survives more failures, but its actual durability depends on the device, replication, and flush contract. A database often uses a write-ahead log: it records information needed for recovery before treating corresponding changes as safely committed under its configuration. Recovery can replay durable log records after a crash.

Database pages need not all be rewritten to their final locations before every response if a durable log can reconstruct the committed change. This is why “the value was in memory” and “the transaction was not durable” are not equivalent claims. Conversely, a response sent before the required durable step may expose a loss window. Ask exactly what a successful commit means.

## B-trees, LSM trees, and amplification

B-tree-family storage organizes keys in ordered pages, making point lookups and ranges efficient. Updates may modify existing pages and maintain indexes. Log-structured merge approaches commonly buffer writes, flush sorted data, and later merge files through compaction. They can make ingestion efficient while introducing background work and multiple places to inspect for a read.

**Write amplification** is physical write work relative to logical user writes. **Read amplification** is extra reading needed to satisfy a logical read. **Space amplification** is extra storage beyond the logical dataset. Indexes, replication, compaction, and obsolete versions affect these costs differently. “Optimized for writes” is incomplete without discussing read cost and background maintenance.

Compaction needs spare I/O and space. If maintenance falls behind, performance and storage use can deteriorate even when foreground requests previously looked sustainable. These implementation details help you understand product behavior; a beginner interview usually does not require implementing a storage engine.

## Bloom filters

A Bloom filter is a compact probabilistic set-membership structure. Under correct construction and use, “definitely absent” can avoid an unnecessary lookup, while “possibly present” still requires checking the actual data. False positives are possible; ordinary Bloom filters do not produce false negatives for correctly inserted items. Stale or incorrectly maintained filters can invalidate how an application uses that guarantee.

This can help avoid reading storage files that cannot contain a key. It does not return the value, replace a unique constraint, or prove a user is authorized. The acceptable false-positive probability trades memory against avoided work.

## IDs and clocks

A centralized sequence makes unique ordered numeric IDs straightforward but adds a shared allocation dependency. Allocating ranges reduces request frequency to the allocator, though crashes may leave gaps. Random IDs reduce coordination but require sufficient entropy and collision handling where uniqueness matters. Time-based distributed schemes often combine time, node identity, and a per-time-unit sequence, and must handle clock rollback and node-ID reuse.

An ID's ordering is not automatically a global causal order or a commit order. Wall clocks can drift. For conversation order, an explicit authority and sequence can be clearer than sorting timestamp-looking IDs. Choose IDs for the actual needs: uniqueness scope, sortability, length, privacy, and allocation throughput.

## CQRS and event sourcing

Command-query responsibility segregation separates the write model from read-oriented representations. A normalized order store can feed a dashboard view organized for quick reads. This adds propagation delay and reconciliation. It does not require separate services or a message broker for every implementation.

Event sourcing stores an event history as the authoritative representation of state, reconstructing or projecting current views from it. An application that merely emits events after updating ordinary tables is not automatically event-sourced. Event sourcing can aid audit and replay, but demands event schema evolution, deterministic interpretation where needed, snapshot management, and careful treatment of corrections and deletion requirements.

Replaying events must not blindly repeat external side effects such as charging a card. Separate rebuilding internal projections from executing business actions. A replay mechanism without a side-effect boundary can turn recovery into duplicate work.

## Distributed transactions and compensation

Two-phase commit coordinates a transaction across participants through a prepare phase and a final decision. It can provide atomic commitment under its protocol and recovery assumptions, but failures can leave participants waiting and holding resources. It is not an automatic choice for every cross-service workflow.

A saga instead uses local commits and business compensations. Reserving inventory, authorizing payment, and confirming an order can be a state machine with recoverable transitions. If confirmation fails, releasing inventory and cancelling an authorization are compensations. Some actions cannot be fully undone, so the workflow must define acceptable intermediate states and human or automated reconciliation.

The decision depends on atomicity requirements, participant capabilities, latency, failure behavior, and organizational ownership. “Distributed transactions are always bad” and “just use a transaction” both skip the actual problem.

# practice | Practice later | Explain, design, then defend

These are optional after your reading pass. Ask an LLM to present one question at a time, wait for your attempt, give a hint if needed, and assess your reasoning before showing a solution. Do not mark “Can explain” based on reading these answer guides.

## Foundation checks

1. Explain a client and a server without describing them as permanent types of machine.
2. Trace a product-page request and identify five places latency can accumulate.
3. Explain how high throughput and poor latency can occur together.
4. Distinguish availability from durability with two failure examples.
5. Derive average requests/s from daily actions, then state a peak assumption.
6. Explain why an index makes some reads cheaper but writes more expensive.
7. Show how two purchases can race for the last item and name the rule that prevents overselling.
8. Explain why a stateless application still needs durable state somewhere.

## Mechanism checks

1. Trace the cache stale-fill race. Does a 60-second TTL guarantee data is at most 60 seconds old?
2. Explain what happens when a worker sends an email and crashes before acknowledging the job.
3. Draw the two crash gaps in a database-plus-broker dual write, then apply an outbox.
4. Distinguish replication from partitioning and show a system that uses both.
5. Explain CAP using an actual network separation, avoiding “pick two.”
6. Explain why R+W>N alone does not prove every required consistency property.
7. Design an idempotency record that handles two simultaneous retries and a reused key with a different body.
8. Explain why unlimited retries and unlimited queues can make an outage worse.

## Design drills

1. Design a URL shortener from a blank page; defend code generation and deletion behavior.
2. Design urgent and bulk notifications sharing providers without starving urgent work.
3. Design offline catch-up for chat after the server accepted a message but the sender missed the acknowledgment.
4. Design a chronological feed, then change the follower distribution to include a few enormous accounts.
5. Add media uploads to chat and explain incomplete uploads, access control, and cleanup.
6. Design a ticket reservation operation with expiry; explain concurrent buyers and delayed payment callbacks.
7. Add a second region to one case study and state the exact change in write and failover semantics.
8. Cut the infrastructure budget in half and explain which requirements or design choices must change.

## Failure drills

For any design, consider these independently: one application dies; the database gets slow; a cache empties; a replica lags; a worker runs twice; a region is unreachable; one tenant generates most traffic; a deployment changes a schema; a permissions change races with a cached read. For each, name the user-visible outcome, the protection mechanism, the recovery path, and the measurement that reveals the problem.

## What a good answer contains

Judge the mechanism, not how many product names appear. A strong answer states assumptions, follows the operation in order, identifies the authoritative data, protects the relevant invariant, names a realistic failure, and acknowledges a cost. A weak answer says “use Redis/Kafka/sharding” without describing what happens when that component is slow, stale, or unavailable.

Use three feedback categories: correct reasoning; missing or uncertain reasoning; and a concrete next question. If a response was mostly supplied by the tutor, record “understood with help” in your notes rather than claiming independent mastery. Revisit the same concept with a changed example later.

## Portable interview-tutor prompt

```text
I have read a beginner-to-intermediate system design handbook.
My primary goal is interviews; my practical experience is basic.
Give me one question at a time about the topic I name.
Wait for my attempt. If I am stuck, give a small hint before a solution.
Ask me to justify mechanisms and tradeoffs, not recite brand names.
Challenge one assumption at a time after I have a coherent baseline.
Do not claim I understand something merely because you explained it.
At the end, summarize demonstrated understanding, gaps, and next practice.
Topic or case: [fill in]
```

# glossary | Quick reference | Terms and decision reminders

## Core vocabulary

| Term | Meaning |
| --- | --- |
| API | A contract for requesting operations and interpreting outcomes |
| Instance | One running copy of a service |
| Latency | Time taken for one operation |
| Throughput | Work completed per unit time |
| Bandwidth | Data transferred per unit time |
| Tail latency | Latency toward the slow end of the distribution |
| SLO | A target for a defined service measurement over a window |
| Source of truth | Authoritative record of a fact |
| Invariant | A rule that must remain true through state changes |
| Transaction | Grouped operations with specified atomicity and isolation guarantees |
| Index | An auxiliary data structure that accelerates suitable lookups |
| Replica | Another copy of data maintained through replication |
| Shard | A partition owning a subset of the data |
| Hot key | A key with disproportionate traffic |
| TTL | Time-to-live rule applied to an entry or record |
| Cache hit | A lookup served by a usable cached entry |
| Fan-out | One action causing work for many destinations |
| Idempotency | Repetition preserves the intended effect of one operation |
| Outbox | Durable event intent committed with business data |
| Backpressure | Limiting upstream work to match downstream capacity |
| Dead-letter queue | Place to inspect or recover work that could not be processed |
| Linearizability | Operations behave atomically in an order respecting real time |
| Eventual consistency | Replicas converge under the system's propagation assumptions |
| Consensus | Agreement on decisions among participants under a failure model |
| Fencing token | Increasing authority value used to reject stale actors |
| RPO | Acceptable recovery data-loss window |
| RTO | Target time to restore service |
| CDC | Capturing committed data changes for downstream use |
| Saga | Workflow of local transactions and compensating actions |
| Hydration | Loading full records for a list of identifiers |

## Decision reminders

| When you observe… | Consider… | First question |
| --- | --- | --- |
| Repeated expensive reads | Cache | How stale may the answer be? |
| Read-heavy database load | Indexes, query changes, read replicas | What queries dominate and what lag is acceptable? |
| Slow optional side effects | Queue and workers | What does acceptance promise? |
| Duplicate operations | Stable identity and atomic deduplication | Which side effects are inside the transaction boundary? |
| One machine running out of resources | Vertical or horizontal scaling | Which resource is actually exhausted? |
| Dataset or writes exceed one owner | Partitioning | Which key preserves access patterns without hotspots? |
| Unbounded dependency waiting | Deadlines and concurrency limits | What is the end-to-end budget? |
| One workload harms others | Bulkheads and fairness | Which resources are shared? |
| Cross-service partial success | State machine, outbox, saga or coordination | Which invariant needs atomic protection? |
| Geographic latency or regional risk | Regional routing and replication | Where is write authority during a partition? |

## Useful formulas, with assumptions

```text
Average requests/s = daily requests / 86,400
Peak requests/s = average requests/s × assumed peak factor
Raw storage = records/day × bytes/record × retained days
Payload bandwidth = responses/s × bytes/response
Average in-flight work = arrival rate × average time (stable system)
Backlog growth/s = arrival rate − completion rate (when positive)
Backlog drain time = backlog / (capacity − ongoing arrivals)
Random-code space = alphabet_size ^ code_length
Expected colliding pairs ≈ n(n−1) / (2 × code_space), low occupancy
```

Replication, indexes, logs, payload overhead, bursts, skew, and failure headroom usually require additional accounting. These formulas organize assumptions; they do not replace workload measurements.

# sources | Sources and further reading | Primary references

These references support selected details called out in the chapters. The explanations, shop examples, numerical assumptions, and case-study architectures are original teaching material. Documentation describes particular implementations; do not generalize every product behavior to every database or broker.

- [MDN: HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) — request/response structure and intermediaries.
- [MDN: HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) — freshness, validation, and cache directives.
- [PostgreSQL: indexes](https://www.postgresql.org/docs/current/indexes.html) — indexing mechanisms and costs.
- [PostgreSQL: transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html) — implementation-specific isolation behavior.
- [Redis: eviction](https://redis.io/docs/latest/develop/reference/eviction/) — policies and memory limits.
- [Apache Kafka: design](https://kafka.apache.org/40/design/design/) — logs and scoped delivery/processing semantics.
- [Google SRE: service-level objectives](https://sre.google/sre-book/service-level-objectives/) — measurement and target definitions.
- [AWS: timeouts, retries, backoff, and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) — bounded remote calls and retry amplification.
- [AWS: idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) — stable operation identity and retry semantics.
- [AWS: transactional outbox](https://docs.aws.amazon.com/en_en/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) — database/event publication coordination.
- [Gilbert and Lynch: CAP paper](https://www.cs.princeton.edu/courses/archive/spring22/cos418/papers/cap.pdf) — the formal consistency/availability limitation during partitions.
- [Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) — one influential design's availability and reconciliation tradeoffs.
- [Raft paper](https://raft.github.io/raft.pdf) — leader election, replicated logs, and consensus safety.
