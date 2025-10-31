const TaskSubmission = require("../models/TaskSubmissions")

const taskVerifyService=async(data)=>{
  const task=await TaskSubmission.create(data)
  return task;
}

module.exports={taskVerifyService}