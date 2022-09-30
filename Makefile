dcb-dev:
	docker-compose build
dcu-dev:
	docker-compose up -d


# front-ssh:
# 	docker exec -it wise_market_web sh
backend-ssh:
	docker exec -it nestjs_output_with_crud_backend sh
db-ssh:
	docker exec -it nestjs_output_with_crud_db /bin/bash