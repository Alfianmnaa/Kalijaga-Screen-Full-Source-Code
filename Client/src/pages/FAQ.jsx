import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";

const FAQItem = ({ idx, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="bg-bgnetflix my-2 shadow-lg" onClick={handleClick}>
      <h2 className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer text-secondary">
        <span>{question}</span>
        <MdExpandMore className={`text-secondary h-6 w-6 transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
      </h2>
      <div className={`border-l-2 border-greenuin overflow-hidden max-h-0 duration-500 transition-all ${isOpen ? "max-h-screen p-3" : ""}`}>
        <p className="text-primary">{answer}</p>
      </div>
    </li>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "How do I use this application?",
      answer: "It's easy you just have to register and login , after that you can watch everything insine kaliga screen.",
    },
    {
      question: "Can I save the movie for later?",
      answer: "Of course you can save if on the save button and you check the movie in the mylist page.",
    },
    {
      question: "Can I change my identitiy after register?",
      answer: "You can change that whenever you want on the seetings menu, you can also change the lassword if you want.",
    },
    {
      question: "How do we do the collaboration to host our movie here?",
      answer: "You can simply contact us on contact page.",
    },
    {
      question: "Should I pay for this ?",
      answer: "If you are from UIN Sunan Kalijaga, you don't have to pay the subscription because its already been sponsored by the universities.",
    },
  ];

  return (
    <div className="h-auto bg-bgnetflix py-16">
      <main className="p-5 bg-light-blue">
        <div className="flex justify-center items-start my-2">
          <div className="w-full sm:w-10/12 md:w-1/2 my-1">
            <h2 className="text-xl font-semibold  mb-4 text-primary text-center ">Kalijaga Screen FAQ</h2>
            <ul className="flex flex-col">
              {faqData.map((item, idx) => (
                <FAQItem key={idx} idx={idx + 1} question={item.question} answer={item.answer} />
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
