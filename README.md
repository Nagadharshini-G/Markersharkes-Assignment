Here,The steps for running the code on your local server:

1. Clone the repository to your PC or computer.
2. Open the code in Visual Studio or another code editor.
3. Install all dependencies required for the project.
4. Start the server.
5. Launch Postman.
6. Set the HTTP method to POST and enter the URL http://localhost:3000/api/supplier/query.
7. Configure the Header:
   - Key: Content-Type
   - Value: application/json
8. In the Body tab, select Raw and ensure it is set to JSON format. Enter the following values for Location, Nature_of_business, and Manufacturing_processes:

   json
   {
     "location": "India",
     "nature_of_business": "large scale",
     "manufacturing_processes": "3D_Printing,Casting"
   }
   
9. View the final output in Postman.