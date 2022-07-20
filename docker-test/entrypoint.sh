docker run -d \
	--name porquinho-test \
  -p 5432:5432 \
  -e POSTGRES_USER=root \
	-e POSTGRES_PASSWORD=docker \
  -e POSTGRES_DB=porquinho \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	postgres