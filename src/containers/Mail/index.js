import React from "react";
import MailComponent from "../../components/MailComponent/MailComponent";
import mailDefaultIcon from "../../assets/icon/mail_default.svg";

//@todo: fetch this from api
const mockMail = [
  {
    _id: 1,
    subject: "Welcome to Breaker! First",
    from: "From Breaker Nation",
    time: "1d",
    image: mailDefaultIcon,
    body: `
    Hi Eugene! We are really exited to welcome you to Breaker Nation! Lets have a quick overview!
    <br> <br>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    <br> <br>
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    `,
  },
  {
    _id: 2,
    subject: "Welcome to Breaker! Second",
    from: "From Breaker Nation",
    time: "1d",
    image: mailDefaultIcon,
    body: `
    Hi Eugene! We are really exited to welcome you to Breaker Nation! Lets have a quick overview!
    <br> <br>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    <br> <br>
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    `,
  },
];

export default function Mail() {
  const [selectedMail, setSelectedMail] = React.useState(null);

  const handleSelectMail = (mailItem) => {
    setSelectedMail(mailItem);
  };

  const clearSelectedMail = () => setSelectedMail(null);

  React.useEffect(() => {
    setSelectedMail(mockMail[0]);
  }, []);

  return (
    <MailComponent selectedMail={selectedMail} clearSelectedMail={clearSelectedMail} handleSelectMail={handleSelectMail} mails={mockMail} />
  );
}
