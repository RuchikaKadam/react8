import { useState, useEffect } from 'react';
import './App.css';
import SubjectDetails from './components/SubjectDetails';

function App() {
  const [subject, setSubject] = useState("");
  const [hour, setHour] = useState(0);
  const [subjects, setSubjects] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let copyArr = [...subjects];
    copyArr.push({
      subject: subject,
      hour: parseInt(hour),
    });
    setSubjects(copyArr);
    setSubject(""); // Clear input field
    setHour(0); // Clear input field
  };

  const increaseHour = (index) => {
    let copyArr = [...subjects];
    copyArr[index].hour += 1;
    setSubjects(copyArr);
  };

  const decreaseHour = (index) => {
    let copyArr = [...subjects];
    if (copyArr[index].hour > 1) {
      copyArr[index].hour -= 1;
    } else {
      const confirmDeletion = window.confirm(`Do you want to delete ${copyArr[index].subject}?`);
      if (confirmDeletion) {
        copyArr.splice(index, 1); // Remove the item from the array
      }
    }
    setSubjects(copyArr);
  };

  useEffect(() => {
    if (subjects.length > 0)
      localStorage.setItem("subject", JSON.stringify(subjects));
  }, [subjects]);

  // To save the data even after you refresh
  useEffect(() => {
    if (localStorage.getItem("subject")) {
      let array = JSON.parse(localStorage.getItem("subject"));
      setSubjects(array);
    }
  }, []);

  return (
    <div className="app-container">
      <h1>Your Education Planner</h1>
      <p>Plan your studies with us!</p>

      <form onSubmit={handleSubmit}>
        <input
          required
          onChange={(e) => setSubject(e.currentTarget.value)}
          value={subject}
          type="text"
          placeholder="Subject"
        />
        <input
          required
          onChange={(e) => setHour(e.currentTarget.value)}
          value={hour}
          type="number"
          placeholder="Hours"
        />
        <input type="submit" value="Add" />
      </form>

      {subjects.map((item, index) => (
        <SubjectDetails
          key={index}
          increase={() => increaseHour(index)}
          decrease={() => decreaseHour(index)}
          subject={item.subject}
          hour={item.hour}
        />
      ))}
    </div>
  );
}

export default App;
