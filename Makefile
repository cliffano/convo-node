ci: deps test install

deps:
	npm install .

test:
	npm run-script test

install:
	npm link

.PHONY: ci deps test install
