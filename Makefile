ci: deps lint test cov cov-publish install

deps:
	npm install .

lint:
	npm run-script lint

test:
	npm run-script test

cov:
	mkdir -p stage
	npm run-script coverage

cov-publish:
	npm run-script publish-coverage

install:
	npm link

.PHONY: ci deps lint test cov cov-publish install
