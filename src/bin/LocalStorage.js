import AsyncStorage from "@react-native-async-storage/async-storage"


export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvY3Jvd2RmdW5kaW5nLnNhbmJlcmRldi5jb21cL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MDU4Nzg5NjksImV4cCI6MTYwOTQ3ODk2OSwibmJmIjoxNjA1ODc4OTY5LCJqdGkiOiJqcEZJOENMZVhmZnFMbkRUIiwic3ViIjoxNDYsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.0fbf7OwPt5y1TjeFbPb7jpjChoTPBFhTUVffZg7RcYk'
  } catch (err){
    console.log("getToken -> err", err)
  }
}