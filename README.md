# Hospital frontend

The “Hospital” is an application to make doctor's appointments more comfortable. It offers a user-friendly interface for all users: administrators, patients and doctors.
This is the frontend part.

## Functionality
**Patients(customers)**

 - Registration and authorization
 - Search for doctors (filters can be used)
 - Make an appointment for a available time
 - View appointments
 - Edit and delete personal profile (including changing avatar)
 - Receiving notifications of cancellation of an appointment

**Doctors(staff)**

 - Authorization
 - Viewing and filtering enrolled patients
 - Export recorded patients to Excel
 - Change work schedule
 - Edit and delete a profile (including changing avatar)
 - Receiving notifications of appointments or cancellations

**Admin**

 - Authorization
 - Staff management( doctors). Creating, changing profile and schedule,
   deleting
 - Export of staff list to excel
 - View and delete patients
 - Management of specializations. Creating, modifying and deleting
 - Receiving notifications about changes in doctors' work schedules

## TechStack

 - TypeScript
 - React
 - Next.js
 - MaterialUI
 - TanStack Query
 - Docker

## Run
1.  Clone project's repo:  `git clone https://github.com/Stepan22-prog/hospital-frontend.git`
2.  In the folder replace in file  **.env**  key values to real
3.  Run:  `npm install`
4.  To start the server in the command line (terminal) in the folder, run:  `npm run dev`
## Visit website
The application was uploaded to GSP: https://hospital-front-632qvqq2oq-od.a.run.app
