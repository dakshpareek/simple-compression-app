import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const FAQSection = () => {
  // Define your SEO-friendly FAQ content here
  const faqData = [
    {
      question: 'How does the file compression process work?',
      answer:
        'File compression is a technique used to reduce the size of files, making them easier to store and transmit. Our file compression process uses advanced algorithms to analyze and remove redundant data, resulting in significant size reduction without losing quality.',
    },
    {
      question: 'What types of files can I compress with this tool?',
      answer:
        'Our file compression tool supports a wide range of file formats, including PDF, ZIP, Excel spreadsheets, and more. Whether it is documents, images, or archives, you can compress various file types effortlessly.',
    },
    {
      question: 'Is file compression safe for my data?',
      answer:
        'Yes, file compression is safe and does not compromise your data integrity. Our compression tool employs secure algorithms that retain file quality while reducing size. Rest assured that your files will remain intact after compression.',
    },
    {
      question: 'Can I compress multiple files and folders together?',
      answer:
        'Absolutely! Our tool allows you to compress multiple files and even entire folders at once. Simply drag and drop your files or folders into the compression area, and we will handle the rest.',
    },
    {
      question: 'How much space can I save with file compression?',
      answer:
        'The amount of space saved depends on the files initial sizes and their content. In general, our compression tool can save up to 70% of the original file size, freeing up valuable storage space on your devices.',
    },
    {
      question: 'Are there any limitations on file size for compression?',
      answer:
        'While there are no strict file size limitations, extremely large files may take longer to compress. For optimal performance, we recommend compressing files up to 500 MB in size.',
    },
    {
      question: 'Is file compression compatible with all devices?',
      answer:
        'Yes, our file compression tool is compatible with various devices and operating systems. Whether you are using a desktop computer, tablet, or smartphone, you can compress files hassle-free.',
    },
    {
      question: 'Can I access my compressed files anytime?',
      answer:
        'Absolutely! Your compressed files will be available for download immediately after the compression process is complete. You can access them on your device or cloud storage anytime, anywhere.',
    },
  ];

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <Collapse className="custom-collapse" accordion>
        {faqData.map((faq, index) => (
          <Panel header={faq.question} key={index}>
            <p>{faq.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQSection;
