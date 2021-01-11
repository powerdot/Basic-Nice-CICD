# Basic-Nice-CICD
Easy continuous deployment on your server for your apps with GitHub Webhook.

## Objective
Making deploying your own applications on your own server is easier using GitHub Webhook.  
1. Install Easy Basic CICD on the server with one line of code;  
2. Add your GitHub repository to the list of projects;  
3. The project will be automatically updated on the server after the next Push to any of the selected branches, for example, master.  
4. ... ?  
5. PROFIT!  

## Roadmap

### Bash
- [ ] One-line sh installer
- [ ] Install: NodeJS
- [ ] Install: PM2
- [ ] Install: Nuxt
- [ ] Install: NPM
- [ ] Install: YARN
- [ ] Download and launch this project (Nuxt SSR)
- [ ] Set admin password

### Frontend
- [ ] Basic login form
- [ ] First setup instructions: get server access to github by auto-generated RSA key.
- [ ] Dashboard design
- [ ] PM2 stats
- [ ] Add new App
- [ ] New App instructions: how to connect with GitHub Webhook
- [ ] Add App deployment type: Backend application
- [ ] Add App deployment type: Static files
- [ ] Add App deployment type: Vue-frontend *with auto build on server side*
- [ ] Add App deployment type: Nuxt SSR *with auto build on server side*
- [ ] Add App deployment type: Nuxt static *with auto build on server side*
- [ ] App deployment pipeline interface
- [ ] App PM2 logs
- [ ] App PM2 managment
- [ ] Terminal connection
- [ ] Create admin interface: update password, edit webhook port, change secret deploy word

### Backend
- [ ] Basic auth
- [ ] Config storage managment (NoSQL or JSON-files)
- [ ] Method module to run deployment for your Backend application
- [ ] Method module to run deployment for your Static files
- [ ] Method module to run deployment for your Vue-frontend
- [ ] Method module to run deployment for your Nuxt SSR
- [ ] Method module to run deployment for your Nuxt static
- [ ] Socket protocol to interact in real time with Frontend
- [ ] Logs fetching from PM2 node
- [ ] Stats fetching from PM2 node
- [ ] Update methods for admin interface
- [ ] Webhook catching from GitHub
- [ ] Basic Nice CICD update fetching and installing
