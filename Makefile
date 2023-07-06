dc-reset-to-factory:
	- docker stop $$(docker ps -a -q)
	- docker kill $$(docker ps -q)
	- docker rm $$(docker ps -a -q)
	- docker rm $$(docker ps -a -q)
	- docker rmi $$(docker images -q)
	- docker system prune --all --force --volumes

dcup-dev:
	docker-compose up

dcup-prod:
	docker-compose -f ./docker-compose.prod.yaml up

dc-down:
	docker-compose down

dc-clear:
	docker-compose down
	docker rmi -f larler_admin larler_frontend

gitpush:
	git add . && git commit -m 'Makefile gitpush' && git push

hosts:
	sudo -- sh -c "echo 127.0.0.1  larler-dev.com >> /etc/hosts"
	sudo -- sh -c "echo 127.0.0.1  api.larler-dev.com >> /etc/hosts"
	sudo -- sh -c "echo 127.0.0.1  admin.larler-dev.com >> /etc/hosts"

rm-hosts:
	sudo -- sh -c "sed -i '' '/127.0.0.1 larler-dev.com/d' /etc/hosts"
	sudo -- sh -c "sed -i '' '/127.0.0.1 api.larler-dev.com/d' /etc/hosts"
	sudo -- sh -c "sed -i '' '/127.0.0.1 admin.larler-dev.com/d' /etc/hosts"