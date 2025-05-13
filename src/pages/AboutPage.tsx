
import Accordion from "@/components/ui/accordion";
import PageTitle from "@/components/PageTitle";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle title="About TechNews"/>
      
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="prose prose-sm sm:prose">
            <p className="text-lg text-gray-700">
              TechNews is your go-to destination for the latest technology news, in-depth reviews, and insightful analysis 
              of the rapidly evolving tech industry. Our mission is to keep you informed about cutting-edge innovations, 
              emerging trends, and breakthrough discoveries that are shaping our digital future.
            </p>
            
            <div className="my-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Our Mission</h2>
              <p>
                We believe that technology has the power to transform lives and create a better world. Our mission is to 
                make technology news accessible, understandable, and relevant to everyone, from tech enthusiasts to 
                casual users.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">What We Cover</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>Latest tech news and breaking stories</li>
                <li>In-depth product reviews and comparisons</li>
                <li>Emerging startups and innovations</li>
                <li>AI and machine learning developments</li>
                <li>Cybersecurity updates and advisories</li>
                <li>Digital lifestyle and tech culture</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Our Values</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>Accuracy and factual reporting</li>
                <li>Independence and editorial integrity</li>
                <li>Accessibility and inclusivity</li>
                <li>Innovation and forward-thinking</li>
                <li>Community engagement and dialogue</li>
                <li>Ethical technology use and development</li>
              </ul>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>How can I contact the editorial team?</AccordionTrigger>
              <AccordionContent>
                You can reach our editorial team at editor@technews.com or through our contact form. We welcome tips, feedback, and suggestions for stories.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq-2">
              <AccordionTrigger>How often is the site updated?</AccordionTrigger>
              <AccordionContent>
                We publish new articles throughout the day, seven days a week. Our editorial team monitors tech news around the clock to ensure you get timely updates on important developments.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq-3">
              <AccordionTrigger>Can I submit a guest post?</AccordionTrigger>
              <AccordionContent>
                Yes, we welcome expert contributions. Please review our guidelines on the Contact page before submitting your proposal.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq-4">
              <AccordionTrigger>How can I report factual errors?</AccordionTrigger>
              <AccordionContent>
                We strive for accuracy in all our reporting. If you spot an error, please email corrections@technews.com with details, and our team will review and address it promptly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Alex Johnson", role: "Editor-in-Chief" },
                { name: "Sophia Chen", role: "Senior Tech Reporter" },
                { name: "Marcus Lee", role: "Product Review Lead" },
                { name: "Priya Sharma", role: "AI & Data Specialist" },
                { name: "David Wilson", role: "Cybersecurity Analyst" },
                { name: "Emma Garcia", role: "Digital Culture Writer" }
              ].map((member, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h4 className="font-bold">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
