export const BiodataReport = (photo, personalData, presentPost, presentOffice, experience) => {

  let html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div style="font-family: serif;display: flex; height: 110px; justify-content: center; flex-direction: column; align-content: center; text-align: center">
      <div style="color: #0000FF; height: 100px; align-items: center; font-size: 20px; font-weight: bold">BANGLADESH WATER DEVELOPMENT BOARD</div>
      <div style="font-size: 15px; color: #008023; height: 80px; font-weight: bold">Human Resourse Development Directorate</div>
      <div style="font-size: 15px; color: #0080FF; height: 80px; font-weight: bold">Bio-data</div>
    </div>
    <hr />

    <div style=" 10px;font-family: serif;display: flex; flex-direction: row; flex: 1">
      <div style="flex: 2; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #0080FF">Employee ID</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">${personalData.id}</div>
        </div>

        <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #0080FF">Employee Name</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">${personalData.name}</div>
        </div>

          <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #0080FF"></div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">${personalData.namebn}</div>
        </div>



        <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #0080FF">Father's Name</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">${personalData.f_name}</div>
        </div>

         <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #0080FF"></div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">${personalData.f_name_bn}</div>
        </div>

        <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #0080FF">Mother's Name</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">${personalData.f_name}</div>
        </div>

          <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #0080FF"></div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">${personalData.f_name_bn}</div>
        </div>

        <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #0080FF">Home District</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">${personalData.homeDist}</div>
        </div>
      </div>

      <div style="flex: 1.25; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #0080FF">Date Of Birth</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 0.5; padding-left: 5px">${personalData.bdate}</div>
        </div>

        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #0080FF">Gender</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 0.5; padding-left: 5px">${personalData.gender}</div>
        </div>

        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #0080FF">Religion</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 0.5; padding-left: 5px">${personalData.religion}</div>
        </div>

        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #0080FF">Maritial Status</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 0.5; padding-left: 5px">${personalData.mstatus}</div>
        </div>

        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #0080FF">Employee Status</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 0.5; padding-left: 5px">920219001</div>
        </div>
      </div>
      <div style="height: 150px; width: 100px; flex: 0.5; display: flex; >
        <div style="background-color:black; text-align:center; ">
           <img style="height: 150px; width: 100px;" src="data:image/png;base64,${photo}">
        </div>
      </div>
    </div>


    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 15px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #0080FF; font-weight: bold">Permanent Address</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">Addl. Chief Eajshahi)bbbbbbblllllll</div>
        </div>
      </div>
    </div>


    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #0080FF; font-weight: bold">Post</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">${presentPost}</div>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #0080FF; font-weight: bold">Office Name</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">${presentOffice}</div>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #0080FF; font-weight: bold">Office Address</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">${personalData.officeAddress}</div>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #0080FF; font-weight: bold">Zone/Equivalent</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">Addl. Chief Engineer (Civil Zone (Rajshahi)bbbbbbblllllll</div>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #0080FF; font-weight: bold">Circle/Directorate</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">${experience}</div>

        </div>
      </div>
    </div>





  </body>
</html>`

  return html

}
