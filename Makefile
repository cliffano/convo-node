deps:
	npm install .

test:
	npm run-script test

install:
	npm link

.PHONY: deps test install
