import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";
import Sidebar from "./Sidebar";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

 

const Profile = () => {
  const navigate = useNavigate();

  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

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

    xschoolName: "",

    xboard: "",

    xpercentage: "",

    xyearOfPassing: "",

    xCity: "",

    xState: "",

    xPincode: "",

  });

 

  const [intermediateDetails, setIntermediateDetails] = useState({

    icollegeName: "",

    iboard: "",

    iprogram: "",

    ipercentage: "",

    iyearOfPassing: "",

    iCity: "",

    iState: "",

  });

 

  const [graduationDetails, setGraduationDetails] = useState({

    gcollegeName: "",

    gboard: "",

    gprogram: "",

    gpercentage: "",

    gyearOfPassing: "",

    gCity: "",

    gState: "",

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
    setExperienceDetails([
      ...experienceDetails,
      { company: "", position: "", startDate: "", endDate: "" }
    ]);
  };
  
  
  const handleSkillSelect = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
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
      graduationDetails,
      skills,
      experienceDetails,
    };
  
    try {
      // Send data to the backend using Fetch API
      const response = await fetch(`${apiUrl}/updateProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type to JSON
        },
        body: JSON.stringify(userData), // Convert data to JSON format
      });
      if (response.ok) {
        // Data successfully sent to the backend
        console.log('Data sent successfully!');
        setIsProfileUpdated(true);
        window.scrollTo(0, 0); // Scroll to the top of the page
        setTimeout(() => {
          setIsProfileUpdated(false); // Reset the success message after a delay
          window.location.reload(); // Reload the page to clear the form
        }, 100); // Delay for 100 milliseconds
      } else {
        // Handle error case
        console.error('Failed to send data to the backend');
      }
      
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  
  

  return (
    <div className="profile-container">
      <div className="sidebar">
       <Sidebar />
      </div>

     
    <form className="profile-form-container" onSubmit={handleSubmit}>
       <h1>Update your profile</h1>
       {isProfileUpdated && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}
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

                value={xClassDetails.xschoolName}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    xschoolName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Board"

                value={xClassDetails.xboard}

                onChange={(e) =>

                  setXClassDetails({ ...xClassDetails, xboard: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Percentage"

                value={xClassDetails.xpercentage}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    xpercentage: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Year of passing"

                value={xClassDetails.xyearOfPassing}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    xyearOfPassing: e.target.value,

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

                value={intermediateDetails.icollegeName}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    icollegeName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Board"

                value={intermediateDetails.iboard}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iboard: e.target.value,

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

                value={intermediateDetails.iprogram}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iprogram: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Percentage"

                value={intermediateDetails.ipercentage}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    ipercentage: e.target.value,

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

                value={intermediateDetails.iyearOfPassing}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iyearOfPassing: e.target.value,

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

                value={graduationDetails.gcollegeName}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gcollegeName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Board"

                value={graduationDetails.gboard}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gboard: e.target.value,

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

                value={graduationDetails.gprogram}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gprogram: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Percentage"

                value={graduationDetails.gpercentage}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gpercentage: e.target.value,

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

                value={graduationDetails.gyearOfPassing}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gyearOfPassing: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="City"

                value={graduationDetails.gCity}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gCity: e.target.value,

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

                value={graduationDetails.GState}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gState: e.target.value,

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
    className={`skill-button ${skills.includes("HTML") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("HTML")}
  >
    HTML
  </button>
  <button
    className={`skill-button ${skills.includes("CSS") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("CSS")}
  >
    CSS
  </button>
  <button
    className={`skill-button ${skills.includes("JavaScript") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("JavaScript")}
  >
    JavaScript
  </button>
  <button
    className={`skill-button ${skills.includes("Java") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("Java")}
  >
    Java
  </button>
  <button
    className={`skill-button ${skills.includes("Python") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("Python")}
  >
    Python
  </button>
  <button
    className={`skill-button ${skills.includes("React") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("React")}
  >
    React
  </button>
  <button
    className={`skill-button ${skills.includes("SQL") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("SQL")}
  >
    SQL
  </button>
  <button
    className={`skill-button ${skills.includes("MongoDB") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("MongoDB")}
  >
    MongoDB
  </button>
  <button
    className={`skill-button ${skills.includes("MySQL") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("MySQL")}
  >
    MySQL
  </button>
  <button
    className={`skill-button ${skills.includes("Bootstrap") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("Bootstrap")}
  >
    Bootstrap
  </button>
  <button
    className={`skill-button ${skills.includes("Vue.js") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("Vue.js")}
  >
    Vue.js
  </button>
  <button
    className={`skill-button ${skills.includes("Angular") ? "active" : ""}`} type="button"
    onClick={() => handleSkillSelect("Angular")}
  >
    Angular
  </button>
  <button
    className={`skill-button ${skills.includes("Flutter") ? "active" : ""}`} type="button"
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