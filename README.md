# Configurations 

recent update - [ 16 may ]

### Current Issues && Future Issues

- [x] admin panel - manage catagories, manage orders!

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



## cloud updates
- [ ] NA

## DB updates
- [ ] NA

## file structure change update
- [ ] NA

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

