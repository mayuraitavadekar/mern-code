# About project

The aim of this repository is to built prototype for https://educulture.co.in to sell courses online. <br/>
The tech stack of the project:
MongoDB, Express.js, React and Node.js, AWS S3(for storing images), Vimeo(video storage/streaming), Razorpay(payments).

This is not active repository. It's only for reference.



### File Structure of React
```bash
├── node_modules
├── public
├── src
|   |
│   ├── admin
|   |     ├── helper
|   |     |     └── adminapicalls.js
|   |	  |
|   |	  ├── AddCategory.js
|   |	  ├── CreateCourse.js
|   |	  ├── ManageCourses.js
|   |	  ├── Order.js
|   |	  ├── UpdateCourse.js	
|   |
|   |
│   ├── assets
|   |     ├── css
|   |	  |     ├── base.css
|   |	  |	├── coursecomponent.css
|   |	  |	├── forms.css
|   |	  |	├── menu.css
|   |	  | 	├── payment.css
|   |	  |	├── styles.css
|   |	  |	├── userdashboard.css
|   |	  |	├── enrollment.css
|   |	  |
|   |	  ├── assets
|   |
|   |
│   ├── auth
|   |     ├── helper
|   |           ├── AdminRoutes.js
|   |           ├── index.js
|   |           ├── PrivateRoutes.js
|   |
│   ├── core
|   |     ├── helper
|   |     |     ├── coreapicalls.js
|   |     |     ├── imagehelper.js
|   |     |     ├── paymentapicalls.js
|   |     |
|   |     ├── Base.js
|   |     ├── CardComponent.js
|   |     ├── CourseComponent.js
|   |     ├── Courses.js
|   |     ├── Home.js
|   |     ├── Menu.js
|   |
|   |
│   ├── user
|   |     ├── helper
|   |     |     ├── userapicalls.js
|   |     |
|   |     ├── AdminDashBoard.js
|   |     ├── AdminNavbar.js
|   |     ├── Payment.js
|   |     ├── AdminNavbar.js
|   |     ├── Profile.js
|   |     ├── Signin.js
|   |     ├── Signup.js
|   |     ├── UserDashBoard.js
|   |     ├── Enrollment.js
|   |
|   |
│   ├── App.js
│   ├── Backend.js
│   ├── index.js
│   └── Routes.js
|
├── .env
├── package.json
└── .gitignore
``` 

### backend-updates
- [x] Auth Routes 
```
- signin
- signout
- signup 

tested! working! jwt-decode may use in front-end
```
- [x] User Routes
```
- getUserById 
- getUser
- updateUser
- getUserPurchaseList(return array)
- deleteAccount
- getUserCourses(return array)
- PushOrderIntoUserPurchaseList

tested! working! except(getUserPurchaseList, getUserCourses will be tested with front-end)
```
- [x] Course Routes
```
- getCourseById
- getCourse
- createCourse
- deleteCourse
- getAllCourses
- getCourse
- getPhoto 

tested! working! getAllCourses is not selecting images! need to test in front-end!
```
- [x] Category Routes
```
- getCategoryByID
- createCategory
- updateCategory
- deleteCategory
- getAllUniqueCategories

tested! working!
```
- [x] Payment Routes
```
- getUserById
- createPaymentOrder(:userId)
- verifyPaymentByWebHook(this method invoked by the razorpay when the payment is captured)
- verifyPayment(this method sends orderId, paymentId and signature to the frontend)
```
- [x] Order Routes
```
- getOrderById
- getUserById
- createOrder(:userId)
- getAllOrders(:userId + only for admins)
```

## front-end updates
Components - Home, Signin, Signup<br>
fetches - Signin, Signup, Signout<br>
middlewares - isAuthenticated, Authenticate<br>
other - signout<br>
future issues - forgot password, No duplicate signups and change password<br>

- [x]
Components - UserDashBoard, Private Routes ( only works if isAuthenticated )<br>
future issues - showing invoices in the userDashBoard, implementing edit modals and change password function.

- [x]
Components - createCategory, createCourse, Admin Routes ( only works if isAuthenticated && role === 1)<br>
fetches - getAllCategories, createCourse<br>

- [x]
Components - ManageCourses -> tested! working! <br>
errors resolved <br>
	- <h3>objects are not valid as react child!</h3>
	- <h3>solution : </h3> typically, in this type of errors, I was submiting the values in the createProduct as type="text" so they were some how storing as objects through the formData into the database. So when I was retrieving them into the manageCourses component, they were coming back as objects and hence during ```courses.map()``` method, they were not strings but objects and hence react was disallowing me. there are two ways to solve this problem, 1) just use ```item.property.toString()``` method in the ```courses.map()``` so that it will get converted into string. 2) store the data as string in the first place in createProduct component.
fetches - getAllCourse <br>
future issue - adding course image/sorting/searching according to category

- [x] 
Components - updateCourse + deleteCourse functions<br>
errors - you cannot involve controllable comps with uncontrollable comps ( still exists ) <br>
fetches - getAllCategories, getCourse, updateCourse<br>

- [x]
Components - (ImageHelper) -reused-in-> (CardComponent) -reused-in-> (Courses)<br>
fetches - getPhoto, getCourses<br>

- [x]
component - CourseComponent, Courses
fetches - getCourseByName


## cloud updates
- [x] data uploaded to vimeo /  kept public all!
- [x] temp static data to educulture.co.in on AWS s3, cloudfront!


## DB updates
- [ ] NA

## file structure change update
- [x] updated README structure

## production updates
- [x] static temp website hosted using s3, cloudfront and godaddy DNS.<br>
important link - https://medium.com/@channaly/how-to-host-static-website-with-https-using-amazon-s3-251434490c59  <br>
important link - https://medium.com/@brodartec/hosting-a-static-site-with-https-enabled-using-aws-s3-cloudfront-and-godaddy-826dae41fdc6 <br>

## libraries

- express-validator - input validations
- express-jwt and jwt - token generation
- crypto + uuid/v1 - password hashing
- jwt_decode - decoding the valid token
- react-router-dom - routing in react
- universal-cookie - storing cookies

## http responses

- 400 - bad req
- 403 - access denied - specially used in authentication
- 200 - OK
- 404 - not found

## important AWS functions

```javascript
const AWS = require("aws-sdk");

// AWS config
const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// setting up S3
const S3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: AWS.config.region,
});

S3.listBuckets((err, data) => {
  if (err) console.log(err);
  else console.log("success", data);
});


const params = {
  Bucket: "ecma-course",
};

S3.listObjects(params, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});

console.log("generating presigned URLs");

var presignedGETURL = S3.getSignedUrl("getObject", {
  Bucket: "ecma-course",
  Key: "ecma-11.mp4", //filename
  Expires: 100, //time to expire in seconds
});

console.log("presigned URLs ", presignedGETURL);
```




	



