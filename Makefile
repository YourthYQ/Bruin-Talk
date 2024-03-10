# run the web app
run: check_npm close
	@if [ -d "./backend/node_modules" ] && [ -d "./frontend/node_modules" ]; then \
		chmod +x ./config/run.sh; \
		./config/run.sh; \
		chmod -x ./config/run.sh; \
	else \
		$(MAKE) install_package; \
		$(MAKE) run; \
	fi

# terminate the application
close:
	@if [ $$(lsof -ti :3001 | wc -l) -ge 1 ]; then \
		kill -9 $$(lsof -ti :3001); \
		echo "React terminated!"; \
	fi

	@if [ $$(lsof -ti :3306 | wc -l) -ge 1 ]; then \
		kill -9 $$(lsof -ti :3306); \
		echo "MySQL terminated!"; \
	fi

	@if [ $$(lsof -ti :3000 | wc -l) -ge 1 ]; then \
		kill -9 $$(lsof -ti :3000); \
		echo "Express terminated!"; \
	fi

	@if [ $$(lsof -ti :4001 | wc -l) -ge 1 ]; then \
		kill -9 $$(lsof -ti :4001); \
		echo "WebSocket terminated!"; \
	fi

# check if npm is installed
# call "make install_npm" if not installed
check_npm:
	@chmod +x ./config/npm_check.sh
	@./config/npm_check.sh
	@chmod -x ./config/npm_check.sh

# install npm for various OS
install_npm:
	@chmod +x ./config/npm_install.sh
	@./config/npm_install.sh
	@chmod -x ./config/npm_install.sh

# install packages using "npm install" for
# the backend and frontend
install_package: check_npm
	@chmod +x ./config/package_install.sh
	@./config/package_install.sh
	@chmod -x ./config/package_install.sh

.PHONY: run close install_package install_npm check_npm
