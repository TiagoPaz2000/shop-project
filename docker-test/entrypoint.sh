docker run -d \
	--name shop-project \
  -p 5432:5432 \
  -e POSTGRES_USER=root \
	-e POSTGRES_PASSWORD=docker \
  -e POSTGRES_DB=shop_project \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	postgres:10.3