import React, { useState } from "react";

import "../css/Profile.css";
import Sidebar from "./Sidebar";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

 

const Profile = () => {

  const [basicDetails, setBasicDetails] = useState({

    firstName: "",

    lastName: "",

    dateOfBirth: "",

    address: "",

    city: "",

    state: "",

    pincode: "",

    alternatePhoneNumber: "",

  });

 

  const [xClassDetails, setXClassDetails] = useState({

    schoolName: "",

    board: "",

    percentage: "",

    yearOfPassing: "",

    xCity: "",

    xState: "",

    xPincode: "",

  });

 

  const [intermediateDetails, setIntermediateDetails] = useState({

    collegeName: "",

    board: "",

    program: "",

    percentage: "",

    yearOfPassing: "",

    iCity: "",

    iState: "",

  });

 

  const [engineeringDetails, setEngineeringDetails] = useState({

    collegeName: "",

    board: "",

    program: "",

    percentage: "",

    yearOfPassing: "",

    eCity: "",

    eState: "",

  });

  // Skills state
  const [skills, setSkills] = useState("");
  const [experienceDetails, setExperienceDetails] = useState([
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
    },
  ]);
  

  const [resumeFile, setResumeFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState("");


  const handleExperienceChange = (e, index, field) => {
    const newExperienceDetails = [...experienceDetails];
    newExperienceDetails[index][field] = e.target.value;
    setExperienceDetails(newExperienceDetails);
  };
  const addExperience = () => {
    setExperienceDetails([...experienceDetails, { company: "", position: "", startDate: "", endDate: "" }]);
  };
  
  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setResumeFile(file);
  };
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to be sent
    const userData = {
      basicDetails,
      xClassDetails,
      intermediateDetails,
      engineeringDetails,
      skills,
      experienceDetails,
    };

    try {
      // Send data to the backend using Fetch API
      const response = await fetch(`${apiUrl}/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Data successfully sent to the backend
        console.log("Data sent successfully!");
      } else {
        // Handle error case
        console.error("Failed to send data to the backend");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
       <Sidebar />
      </div>
    <form className="profile-form-container" onSubmit={handleSubmit}>
       <h1>Update your profile</h1>
      {/* File Upload section */}
      <div className="file-upload-container">
        <p className="Details-name">Upload your resume:</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />
        <div
        className={`file-drop-area ${dragging ? "dragging" : ""}`}
        onDrop={handleFileDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
      >
        <p className="Details-name">Drag and drop your resume here</p>
      </div>

      </div>


      <p className="Details-name">Basic Details:</p>

      <table>

        <tbody>

          <tr>

            <td>

              <input

                type="text"

                placeholder="FirstName"

                className="firstName"

                value={basicDetails.firstName}

                onChange={(e) =>

                  setBasicDetails({

                    ...basicDetails,

                    firstName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="LastName"

                className="lastName"

                value={basicDetails.lastName}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, lastName: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="date"

                placeholder="DateOfBirth"

                className="dateofbirth"

                value={basicDetails.dateOfBirth}

                onChange={(e) =>

                  setBasicDetails({

                    ...basicDetails,

                    dateOfBirth: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Address"

                value={basicDetails.address}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, address: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="City"

                value={basicDetails.city}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, city: e.target.value })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="State"

                value={basicDetails.state}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, state: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Pincode"

                value={basicDetails.pincode}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, pincode: e.target.value })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Alternate phone number"

                value={basicDetails.alternatePhoneNumber}

                onChange={(e) =>

                  setBasicDetails({

                    ...basicDetails,

                    alternatePhoneNumber: e.target.value,

                  })

                }

              />

            </td>

          </tr>

        </tbody>

      </table>

 

      <p className="Details-name">X-Class Details:</p>

      <table>

        <tbody>

          <tr>

            <td>

              <input

                type="text"

                placeholder="School Name"

                value={xClassDetails.schoolName}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    schoolName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Board"

                value={xClassDetails.board}

                onChange={(e) =>

                  setXClassDetails({ ...xClassDetails, board: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Percentage"

                value={xClassDetails.percentage}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    percentage: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Year of passing"

                value={xClassDetails.yearOfPassing}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    yearOfPassing: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="City"

                value={xClassDetails.xCity}

                onChange={(e) =>

                  setXClassDetails({ ...xClassDetails, xCity: e.target.value })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="State"

                value={xClassDetails.xState}

                onChange={(e) =>

                  setXClassDetails({ ...xClassDetails, xState: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Pincode"

                value={xClassDetails.xPincode}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    xPincode: e.target.value,

                  })

                }

              />

            </td>

          </tr>

        </tbody>

      </table>

 

      <p className="Details-name">Intermediate Details:</p>

      <table>

        <tbody>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Name of college"

                value={intermediateDetails.collegeName}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    collegeName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Board"

                value={intermediateDetails.board}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    board: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Program"

                value={intermediateDetails.program}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    program: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Percentage"

                value={intermediateDetails.percentage}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    percentage: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Year of passing"

                value={intermediateDetails.yearOfPassing}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    yearOfPassing: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="city"

                value={intermediateDetails.iCity}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iCity: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="State"

                value={intermediateDetails.iState}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iState: e.target.value,

                  })

                }

              />

            </td>

          </tr>

        </tbody>

      </table>

 

      <p className="Details-name">Engineering Details:</p>

      <table>

        <tbody>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Name of college"

                value={engineeringDetails.collegeName}

                onChange={(e) =>

                  setEngineeringDetails({

                    ...engineeringDetails,

                    collegeName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Board"

                value={engineeringDetails.board}

                onChange={(e) =>

                  setEngineeringDetails({

                    ...engineeringDetails,

                    board: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Program"

                value={engineeringDetails.program}

                onChange={(e) =>

                  setEngineeringDetails({

                    ...engineeringDetails,

                    program: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Percentage"

                value={engineeringDetails.percentage}

                onChange={(e) =>

                  setEngineeringDetails({

                    ...engineeringDetails,

                    percentage: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Year of Passing"

                value={engineeringDetails.yearOfPassing}

                onChange={(e) =>

                  setEngineeringDetails({

                    ...engineeringDetails,

                    yearOfPassing: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="City"

                value={engineeringDetails.eCity}

                onChange={(e) =>

                  setEngineeringDetails({

                    ...engineeringDetails,

                    eCity: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="State"

                value={engineeringDetails.eState}

                onChange={(e) =>

                  setEngineeringDetails({

                    ...engineeringDetails,

                    eState: e.target.value,

                  })

                }

              />

            </td>

          </tr>

        </tbody>

      </table>

     
      <p className="Details-name">Skills:</p>
<div className="skills-buttons">
  <button
    className={`skill-button ${selectedSkill === "HTML" ? "active" : ""}`}
    onClick={() => handleSkillSelect("HTML")}
  >
    HTML
  </button>
  <button
    className={`skill-button ${selectedSkill === "CSS" ? "active" : ""}`}
    onClick={() => handleSkillSelect("CSS")}
  >
    CSS
  </button>
  <button
    className={`skill-button ${selectedSkill === "JavaScript" ? "active" : ""}`}
    onClick={() => handleSkillSelect("JavaScript")}
  >
    JavaScript
  </button>
  <button
    className={`skill-button ${selectedSkill === "Java" ? "active" : ""}`}
    onClick={() => handleSkillSelect("Java")}
  >
    Java
  </button>
  <button
    className={`skill-button ${selectedSkill === "Python" ? "active" : ""}`}
    onClick={() => handleSkillSelect("Python")}
  >
    Python
  </button>
  <button
    className={`skill-button ${selectedSkill === "React" ? "active" : ""}`}
    onClick={() => handleSkillSelect("React")}
  >
    React
  </button>
  <button
    className={`skill-button ${selectedSkill === "SQL" ? "active" : ""}`}
    onClick={() => handleSkillSelect("SQL")}
  >
    SQL
  </button>
  <button
    className={`skill-button ${selectedSkill === "MongoDB" ? "active" : ""}`}
    onClick={() => handleSkillSelect("MongoDB")}
  >
    MongoDB
  </button>
  <button
    className={`skill-button ${selectedSkill === "MySQL" ? "active" : ""}`}
    onClick={() => handleSkillSelect("MySQL")}
  >
    MySQL
  </button>
  <button
    className={`skill-button ${selectedSkill === "Bootstrap" ? "active" : ""}`}
    onClick={() => handleSkillSelect("Bootstrap")}
  >
    Bootstrap
  </button>
  <button
    className={`skill-button ${selectedSkill === "Vue.js" ? "active" : ""}`}
    onClick={() => handleSkillSelect("Vue.js")}
  >
    Vue.js
  </button>
  <button
    className={`skill-button ${selectedSkill === "Angular" ? "active" : ""}`}
    onClick={() => handleSkillSelect("Angular")}
  >
    Angular
  </button>
  <button
    className={`skill-button ${selectedSkill === "Flutter" ? "active" : ""}`}
    onClick={() => handleSkillSelect("Flutter")}
  >
    Flutter
  </button>
</div>
 {/* ...Previous Code... */}

<p className="Details-name">Experience Details:</p>

{experienceDetails.map((experience, index) => (
  <table key={index} className="experience-table">
    <tbody>
      <tr>
        <td>
          <input
            type="text"
            placeholder="Company"
            value={experience.company}
            onChange={(e) => handleExperienceChange(e, index, "company")}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Position"
            value={experience.position}
            onChange={(e) => handleExperienceChange(e, index, "position")}
          />
        </td>
        <td>
          <input
            type="date"
            placeholder="Start Date"
            value={experience.startDate}
            onChange={(e) => handleExperienceChange(e, index, "startDate")}
          />
        </td>
        <td>
          <input
            type="date"
            placeholder="End Date"
            value={experience.endDate}
            onChange={(e) => handleExperienceChange(e, index, "endDate")}
          />
        </td>
        <td>
        <button type="button" onClick={addExperience}>Add Experience</button>
        </td>
      </tr>
    </tbody>
   
  </table>
  
))}






      <button type="submit">Submit</button>

    </form>
    </div>

  );

};

 

export default Profile;