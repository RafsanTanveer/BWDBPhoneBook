export const BiodataReport = (id, name, photo, experience) => {

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
    <div style="display: flex; height: 110px; justify-content: center; flex-direction: column; align-content: center; text-align: center">
      <div style="color: rgb(33, 27, 202); height: 100px; align-items: center; font-size: 30px; font-weight: bold">Bangladesh Water Development Board</div>
      <div style="font-size: 20px; color: rgb(7, 130, 50); height: 80px; font-weight: bold">Human Resourse Development Directorate</div>
      <div style="font-size: 20px; color: rgb(114, 145, 223); height: 80px; font-weight: bold">Bio-data</div>
    </div>
    <hr />

    <div style="display: flex; flex-direction: row; flex: 1">
      <div style="flex: 2; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #377df5">Employee ID</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">920219001</div>
        </div>

        <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #377df5">Employee Name</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">${name}</div>
        </div>

          <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #377df5"></div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">রাফসান জানি রাব্বি</div>
        </div>



        <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #377df5">Father's Name</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">Belayet Hossain</div>
        </div>

         <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #377df5"></div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">মোঃ বেলায়েত হোসেন</div>
        </div>

        <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #377df5">Mother's Name</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">Khadiza Begum</div>
        </div>

          <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #377df5"></div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">খাদিজা বেগম</div>
        </div>

        <div style="display: flex; flex-direction: row; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.6; color: #377df5">Home District</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 1.1; padding-left: 5px">Dhaka</div>
        </div>
      </div>

      <div style="flex: 1.25; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #377df5">Date Of Birth</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 0.5; padding-left: 5px">920219001</div>
        </div>

        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #377df5">Gender</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 0.5; padding-left: 5px">920219001</div>
        </div>

        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #377df5">Religion</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 0.5; padding-left: 5px">920219001</div>
        </div>

        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #377df5">Maritial Status</div>
          <div style="flex: 0.05">:</div>
          <div style="flex: 0.5; padding-left: 5px">920219001</div>
        </div>

        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="font-weight: bold; flex: 0.7; color: #377df5">Employee Status</div>
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
          <div style="flex: 4.5; color: #377df5; font-weight: bold">Permanent Address</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">Addl. Chief Eajshahi)bbbbbbblllllll</div>
        </div>
      </div>
    </div>


    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #377df5; font-weight: bold">Post</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">Assistant Programmer</div>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #377df5; font-weight: bold">Office Name : 623200</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">Addl. Chief Eajshahi)bbbbbbblllllll</div>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #377df5; font-weight: bold">Office Address</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">Addl. Chief Engineer (Civil), Norhahi)bbbbbbblllllll</div>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #377df5; font-weight: bold">Zone/Equivalent</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">Addl. Chief Engineer (Civil Zone (Rajshahi)bbbbbbblllllll</div>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: row; flex: 1; margin-top: 8px">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex: 1; flex: auto; justify-content: space-between">
          <div style="flex: 4.5; color: #377df5; font-weight: bold">Circle/Directorate</div>
          <div style="flex: .3; padding-left: 5px">:</div>
          <div style="flex: 15; padding-left: 5px">${experience}</div>

        </div>
      </div>
    </div>





  </body>
</html>`

    return html

}
