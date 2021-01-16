<p align="center">
  <img src="https://github.com/powerdot/Basic-Nice-CICD/raw/main/about/GitHub-Logo@0.5x.jpg">
</p>

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
- [ ] Install: NGINX
- [ ] Install: NPM
- [ ] Install: YARN
- [ ] Install: NodeJS
- [ ] Install: PM2
- [ ] Install: Nuxt
- [ ] Download and launch this project

### Frontend
- [x] Basic login form
- [ ] First setup instructions: get server access to github by auto-generated RSA key.
- [ ] Dashboard design
- [x] PM2 stats
- [x] Add new App
- [ ] New App instructions: how to connect with GitHub Webhook
- [ ] Add App deployment type: Backend application
- [ ] Add App deployment type: Static files
- [ ] Add App deployment type: Vue-frontend *with auto build on server side*
- [ ] Add App deployment type: Nuxt SSR *with auto build on server side*
- [ ] Add App deployment type: Nuxt static *with auto build on server side*
- [ ] App deployment pipeline interface
- [x] App PM2 logs
- [x] App PM2 managment
- [x] NGINX managment
- [ ] Terminal connection
- [ ] Create admin interface: update password, edit webhook port, change secret deploy word

### Backend
- [x] Basic auth
- [x] Config storage managment (NoSQL or JSON-files)
- [ ] Method module to run deployment for your Backend application
- [ ] Method module to run deployment for your Static files
- [ ] Method module to run deployment for your Vue-frontend
- [ ] Method module to run deployment for your Nuxt SSR
- [ ] Method module to run deployment for your Nuxt static
- [ ] Socket protocol to interact in real time with Frontend
- [x] Logs fetching from PM2 node
- [x] Stats fetching from PM2 node
- [ ] Update methods for admin interface
- [ ] Webhook catching from GitHub
- [ ] Basic Nice CICD update fetching and installing
- [ ] NGINX config edit methods and control


## For Basic Nice developers

To start develop this app you need:  
  
**Install PM2**
```bash
npm i pm2 -g
```
  
**Install Nuxt**
```bash
npm i nuxt -g
```  

**Run Nuxt** right from project directory
```bash
sudo npm run dev
```  
*You need root rights to allow backend work with nginx and system files.*  
  
  
Good luck!
