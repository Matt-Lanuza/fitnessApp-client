# Fitness App API - Documentation

## Resources

- App Base Url
    - https://fitnessapi-lanuza.onrender.com

## User Credentials
### Dummy Users
- **email**: dummyuser@workout.com  
- **password**: dummy123 <br><br>

- **email**: teemo@workout.com  
- **password**: teemo123  

## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "email": "dummyuser@mail.com",
        "password": "dummy123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "firstName": "Dummy",
        "lastName": "User",
        "email": "dummy@workout.com",
        "password": "dummy123",
        "mobileNo": "09123456789"
    }

    ```
#### [GET] - "/users/details"

- Requires token
- No Request Body

      
### Workouts

#### [POST] - "/workouts/addWorkout"

- Sample Request Body

    ```json

    {
        "name": "Sample Workout",
        "duration": "30 mins",
    }

    ```

#### [GET] - "/workouts/getMyWorkouts"
- Requires Token
- No Request Body


#### [PATCH] - "/workouts/updateWorkout/:id"
- Requires Token
- Sample Request Body

    ```json

    {
        "name": "Updated Workout",
        "duration": "15 mins",
    }

    ```

#### [DELETE] - "/workouts/deleteWorkout/:id"
- Requires Token
- No Request Body

#### [PATCH] - "/workouts/completeWorkoutStatus/:id"
- Requires Token
- No Request Body
