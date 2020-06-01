# Configurations 

recent update - [ 2 June ]

### Current Issues
- [x] update: updateCourse component
- [ ] manageCategory Component
- [ ] verify account through email
- [ ] delete account
- [ ] change password
- [x] uploading videos to vimeo with no privacy ( later on testing with private videos embedding is required )
- [x] create course by inserting the vimeo data into the database.
- [x] write the appropriate backend methods to send the required cloud data with the database course data to the front end. 
- [x] handle data in the front end.
- [x] user can play videos on website using modal. those will be only free videos. So either from vimeo public URL or from youtube public URL. Rest of the links are disabled. 
- [x] on cliking cards of courses, the backend will fetch the getCourse() route and course data will be shown to the user. on this component, user can see all the content ( sections, videos in each section ), details about course, course trainer details, etc. User can buy the course here. if the user has already bought this course, there will be disabled button so that user cannot buy the course again. 
- [ ] on cliking the ```purchase course``` button, the pop up of payment gateway is opened, user needs to enter the card information / payment information here. after processing of successfull payment code in the backend, the later code will be of adding that course data into the user model so that user can see that course in purchase list. 
- [ ] Now, the secure coding is required here so that we can get the correct information about upto what stage the payment process is done. So there is need of one more entity in user model / order model - payment status - initiated, incomplete, , processing and complete.
- [ ] if the payment is complete, the course is added in the user model, the email will be sent to the user about which course he has purchased.
- [ ] else the status of the payment is mailed to user. 

### future issues
- [ ] uploading videos in S3
- [ ] use security best practices CORS/ACL/signedURLs etc.
- [ ] design the video player
- [ ] design the page containing - video player, syllabus, all URLs and name of concepts!
- [ ] fetch the data from database into the page having urls!
- [ ] when use clicks on perticular link, getSignedURL and direct update src in video player to play video
- [ ] setup complete cloud architecture containing s3, lambda, media-convert, cloudfront!
- [ ] admin panel - manage categories (future issue)

### backend-updates
- [x] Auth Routes -> signin, signout, signup | tested! working! jwt-decode may use in front-end
- [x] User Routes -> getUserById, getUser, updateUser, getUserPurchaseList(return array), deleteAccount, getUserCourses(return array) | tested! working! except(getUserPurchaseList, getUserCourses will be tested with front-end)
- [x] Course Routes -> getCourseById, getCourse, createCourse, deleteCourse, getAllCourses, getCourse, getPhoto | tested! working! getAllCourses is not selecting images! need to test in front-end!
- [x] Category Routes -> getCategoryByID, createCategory, updateCategory, deleteCategory, getAllUniqueCategories | tested! working!

## front-end updates
- [x] 
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


## DB updates
- [ ] NA

## file structure change update
- [ ] NA

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
## JSON course data

```

```xmi

[
	{
		"sectionname": "introduction",
		"sectiondata": [
			{
				"topic": "what is javascript",
				"videourl": "www.videourl.com"
			},
			{
				"topic": "let vs const",
				"videourl": "www.videourl.com"
			}
		]
	},
	{
		"sectionname": "advanced concepts in javascript",
		"sectiondata": [
			{
				"topic": "inheritance in javascript",
				"videourl": "www.videourl.com"
			},
			{
				"topic": "memory usage and code debugging",
				"videourl": "www.videourl.com"
			}
		]
	}
]



```


