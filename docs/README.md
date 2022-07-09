# HomePage Counter

> Count visitors for your README.md, Issues, PRs, etc

in just one line markdown code

![visitors](https://counter.tino.sh/visitor/tinoschroeter)

![test](https://test.tino.sh)

<img src="https://test.tino.sh" alt="test">

```md
![visitors](https://counter.tino.sh/visitor/tinoschroeter)
```

## development

```bash
cd app
npm install
npm start

open http://localhost:3000/visitor/name
```

```sql
sqlite3 data.sql

C | insert into counter values ("alice", 42);
R | select * from counter;
U | update counter set count = 77 where id = "alice";
D | delete from counter where id = "alice";
```

```sql
.schema counter
CREATE TABLE counter (id text NOT NULL UNIQUE, count integer NOT NULL);
```

