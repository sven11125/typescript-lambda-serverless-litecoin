# This is an initial commit for the project

# Environment
     -  aws cli
     -  node : 12.X
     -  typeorm cli

# Structure
## There are 2 Services
- Admin service
- Mobile App serivce ( User Service )

# Local Development
- to start Admin service

        ` npm run start:admin  `

- to start staff service

        `npm run start:user`

# Deployment
- to deploy admin service
    
        `npm run deploy:admin:dev`

- to deploy user service
  
        `npm run deploy:user:dev`

# DB Management
- Make migration
      
      `npm run generate:migration:dev`

- Migrate Database

        `npm run migrate:dev`

- To revert dabase migration

        `npm run migrate:revert:dev`
