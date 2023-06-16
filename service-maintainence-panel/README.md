# GLOVIS ETA CALCULATOR COMMAND CENTER
----


Code Structure
- models - Contains DB models
- jobs - Contains scheduled triggers for pipelines
- public - contains public static assets
- ks - UI subsystem
- routes - contains routes for REST endpoints
- services - business logic files.
- Dockerfile - Dockerfile for service
- docker-compose.yms - Defines docker farm.
- ml/trainings - All code regarding training of models
- ml/models - built tensorflow models
- ml/runtimes - runtime algorithms and model executors.


### Build docker

`docker build -t ml_cc_app .`

## Setup in your environment

Running this system is very easy in local environment as we have adequate docker runtimes to ease all setup processes.

#### Software requirements

* Docker runtime
* Terminal
* Preferred linux or Mac, but windows is also fine.
* Docker-Compose add on for docker

#### To run the app

1. One time step: 
Build docker image for application, for this run the following command:
`docker build -t ml_cc_app .`

2. Start app: run the command `docker-compose up`. This will spin up the app and mongo database and expose a port where the system control center is running.

All Set!

**Note:**: On first time setup system will auto create an initial admin login which can be used to log in and create further users, feel free to change password or delete default user. The default creds are:
`'email': 'admin@variedy.com', 'password': 'admin'`






mini-birdautomotive.in	A	Simple	-	No	65.2.62.4
300	-	-	-
mini-birdautomotive.in	MX	Simple	-	No	10 mail.ggimail.in.
20 mail.globegroundindia.com.
30 mail1.ggimail.in.
40 mail1.globegroundindia.com.
300	-	-	-
mini-birdautomotive.in	NS	Simple	-	No	ns-1620.awsdns-10.co.uk.
ns-1398.awsdns-46.org.
ns-126.awsdns-15.com.
ns-651.awsdns-17.net.
172800	-	-	-
mini-birdautomotive.in	SOA	Simple	-	No	ns-1620.awsdns-10.co.uk. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400
900	-	-	-
mini-birdautomotive.in	TXT	Simple	-	No	"v=spf1 a mx a:mail.mini-birdautomotive.in mx:mail.thebirdgroup.com mx:mail1.thebirdgroup.com ip4:203.89.132.241 ip4:203.89.132.242 ~all"
300	-	-	-
mail.mini-birdautomotive.in	A	Simple	-	No	203.89.132.36
300	-	-	-
mail.mini-birdautomotive.in	MX	Simple	-	No	10 mail.ggimail.in.
20 mail.globegroundindia.com.
30 mail1.ggimail.in.
40 mail1.globegroundindia.com.
300	-	-	-
mail.mini-birdautomotive.in	TXT	Simple	-	No	"v=spf1 a mx a:mail.mini-birdautomotive.in mx:mail.thebirdgroup.com mx:mail1.thebirdgroup.com ip4:203.89.132.241 ip4:203.89.132.242 ~all"
300	-	-	-
origin.mini-birdautomotive.in	A	Simple	-	No	13.232.181.150
300	-	-	-
uat.mini-birdautomotive.in	A	Simple	-	No	3.6.130.100
300	-	-	-
www.mini-birdautomotive.in	A	Simple	-	No	65.2.62.4
300	-




mini-navnitmotors.in	A	Simple	-	No	65.2.62.4
300	-	-	-
mini-navnitmotors.in	NS	Simple	-	No	ns-253.awsdns-31.com.
ns-1113.awsdns-11.org.
ns-792.awsdns-35.net.
ns-1603.awsdns-08.co.uk.
172800	-	-	-
mini-navnitmotors.in	SOA	Simple	-	No	ns-253.awsdns-31.com. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400
900	-	-	-
uat.mini-navnitmotors.in	A	Simple	-	No	3.6.130.100
300	-	-	-
www.mini-navnitmotors.in	A	Simple	-	No	65.2.62.4
300	-	-	-






