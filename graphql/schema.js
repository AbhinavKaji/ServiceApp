const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type AuthData{
        userId:ID
        token: String
        tokenExpiration:Int
    }

    type Message {
        message:String
    }
    type User{
        id:ID
        name: String,
        email: String,
        phoneNo: String,
        password: String
    }

    input UserInput{
        name: String!,
        email: String!,
        phoneNo: String,
        password: String!
    }

    input RequestInput{
        serviceProviderId: Int,
        ScheduledDate: String,
        Location: String,
        ServiceType: String
    }
    type Review{
        ServiceProviderId: Int,
        userId: Int,
        reviewDate: String,
        knowledge: Int,
        skill: Int,
        CustomerSatisfaction: Int,
        AverageReview: String,
        comment: String
    }
    input ReviewInput{
        ServiceProviderId: Int,
        reviewDate: String,
        knowledge: Int,
        skill: Int,
        CustomerSatisfaction: Int,
        comment: String
    }
    type Request{
        UserId: Int,
        serviceProviderId: Int,
        RequestedDate: String,
        RequestAcceptStatus: Boolean,
        ScheduledDate: String,
        Location: String,
        ServiceCharge: String,
        ServiceType: String
    }

    input RequestStatusUpdate{
        serviceProviderId: Int,
        RequestAcceptStatus: Boolean
    }

    input ServiceProviderDetailsInput{
        experience:Int,
        Charges:String,
        AllocatedRegion:String,
        Description:String,
        workingPlatform:[String]
    }

    type ServiceProviderDetails{
        id:ID,
        UserId:Int,
        experience:Int,
        Charges:String,
        AllocatedRegion:String,
        Description:String,
        workingPlatform:[workingPlatform]
    }

    type workingPlatform{
        id:ID,
        ServiceProviderId:Int,
        platform:String
    }

    input workingPlatformInput{
        platform:String
    }

    type OTPData{
        token:String,
        remaining:String
    }

    type RootQuery{
        welcome:Message,
        login(email:String!,password:String!):AuthData,
        getAllUser:[User],
        logOut:Boolean
    }

    type RootMutation{
        createUser(input:UserInput):AuthData,
        getServiceProvider(id:ID):ServiceProviderDetails,
        updateServiceProvider(id:ID,input:ServiceProviderDetailsInput):Message,
        SendOtpCode(phone:String,secret:String):OTPData,
        verifyOtpCode(OTPCode:String,secret:String):Boolean,
        verifyOtpForLogin(OTPCode:String,secret:String,phone:String):AuthData,
        generateOTPSecret:String,
        RequestAPI(input:RequestInput):Message
        provideReview(input:ReviewInput):Message
        getAllReviewBySPID(id:ID):[Review]
        getAverageRatebySPID(id:ID):Message
    }

    schema{
        query:RootQuery,
        mutation:RootMutation
    }
    
`);
