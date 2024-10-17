import type React from 'react';
import { type ReactNode, createContext, useContext, useState } from 'react';

export type Delegate = {
  address: string;
  discord: string;
  twitter: string;
  mirror: string;
  description: string;
};

type DelegatesContextType = {
  delegates: Delegate[];
  displayedDelegates: Delegate[];
  loadMore: () => void;
};

const DelegatesContext = createContext<DelegatesContextType | undefined>(
  undefined,
);

export const useDelegates = () => {
  const context = useContext(DelegatesContext);
  if (context === undefined) {
    throw new Error('useDelegates must be used within a DelegatesProvider');
  }
  return context;
};

type DelegatesProviderProps = {
  children: ReactNode;
};

export const DelegatesProvider: React.FC<DelegatesProviderProps> = ({
  children,
}) => {
  const delegates = [
    {
      address: '0x01',
      discord: 'delegate1#1234',
      twitter: '@delegate1',
      mirror: 'delegate1.mirror.xyz',
      description: `I want to further support the important work that Optimism is doing on scaling. I'm also passionate about public goods funding and governance experimentation.
	**My view on the Optimistic Vision:** I align strongly with the vision. I'm excited about the new model focused on optimizing for positive impact and providing retroactive incentives for public goods.
	**My view on the first three articles of the Working Constitution:**
	1. Agree, I think the collective should be open to experimentation and be dynamic in the early days as we grow and learn
	2. Agree, I'm supportive of checks and balances
	3. Agree, I'm glad to see the Optimism Foundation be a steward of the collective early on
	**My skills and areas of expertise:**
	- Product (previously product manager at Coinbase)
	- Governance (delegate for Gitcoin and Element DAO)
	- Writing / creating educational content
	- Operations
	- Strategy
	- DeFi (advisor of 0x and investor in many DeFi projects)
	- Investing (co-founder of crypto fund Scalar Capital)`,
    },
    {
      address: '0x02',
      discord: 'delegate2#5678',
      twitter: '@delegate2',
      mirror: 'delegate2.mirror.xyz',
      description: `As a long-time supporter of Ethereum and layer 2 solutions, I'm excited to contribute to Optimism's growth. My focus is on sustainable ecosystem development and user adoption.
	I strongly believe in Optimism's vision of scalable, accessible blockchain infrastructure. The retroactive public goods funding model is particularly intriguing and I believe it can drive significant positive impact.
	**Regarding the Working Constitution:**
	1. I agree that flexibility is crucial in these early stages.
	2. Checks and balances are essential for long-term stability and fairness.
	3. The Optimism Foundation's stewardship is important for guiding initial growth.
	**My background includes:**
	- Smart contract development
	- Community management
	- DeFi protocol design
	- Involvement in several DAOs
	- Experience in governance processes and token economics`,
    },
    {
      address: '0x03',
      discord: 'delegate3#9012',
      twitter: '@delegate3',
      mirror: 'delegate3.mirror.xyz',
      description: `My goal is to bridge the gap between technical innovation and real-world adoption of Optimism. I'm passionate about creating user-friendly interfaces and educating newcomers about the potential of layer 2 solutions.
	The Optimistic Vision resonates with me, especially the focus on positive-sum outcomes and the innovative approach to funding public goods.
	**On the Working Constitution:**
	1. Flexibility and experimentation are crucial at this stage.
	2. I strongly support the implementation of checks and balances.
	3. The Optimism Foundation's role as an initial steward is appropriate and necessary.
	**My expertise lies in:**
	- UX/UI design
	- Technical writing
	- Community education
	- Contributing to open-source projects
	- Organizing hackathons and developer workshops`,
    },
    {
      address: '0x04',
      discord: 'delegate4#3456',
      twitter: '@delegate4',
      mirror: 'delegate4.mirror.xyz',
      description: `As a researcher in cryptoeconomics, I'm fascinated by Optimism's approach to scaling and governance. I aim to contribute to the development of robust economic models that can sustain long-term growth.
	I'm aligned with the Optimistic Vision, particularly the emphasis on experimentation and the pursuit of a more efficient and equitable digital economy.
	**Thoughts on the Working Constitution:**
	1. Agree - adaptability is key in this rapidly evolving space.
	2. Strongly agree - checks and balances are fundamental to good governance.
	3. Agree - the Foundation's stewardship is important for initial direction.
	**My background includes:**
	- Academic research in game theory and mechanism design
	- Practical experience in tokenomics and DAO structuring
	- Keen to apply these skills to Optimism's unique challenges`,
    },
    {
      address: '0x05',
      discord: 'delegate5#7890',
      twitter: '@delegate5',
      mirror: 'delegate5.mirror.xyz',
      description: `My focus is on ensuring that Optimism's growth aligns with principles of decentralization and inclusivity. I believe in the power of community-driven development and aim to amplify diverse voices within the ecosystem.
	The Optimistic Vision's emphasis on collective benefit and innovative funding models is inspiring. I'm particularly interested in exploring how these principles can be applied to promote global accessibility.
	**Regarding the Working Constitution:**
	1. Agree - we need room to evolve and adapt.
	2. Strongly agree - balanced power structures are essential.
	3. Agree - the Foundation's initial guidance is valuable.
	**I bring experience in:**
	- Community organizing
	- Decentralized governance
	- Social impact assessment
	- Working with grassroots blockchain initiatives
	- Bridging technology with social good`,
    },
    {
      address: '0x06',
      discord: 'delegate6#2345',
      twitter: '@delegate6',
      mirror: 'delegate6.mirror.xyz',
      description: `As a security researcher, my goal is to contribute to the robustness and reliability of Optimism's infrastructure. I believe that trust is fundamental to adoption, and security is key to building that trust.
	I support the Optimistic Vision, especially its focus on sustainable growth and positive impact. The emphasis on retroactive funding for public goods is an innovative approach that I believe can drive significant progress.
	**On the Working Constitution:**
	1. Agree - flexibility is crucial for addressing emerging security challenges.
	2. Strongly agree - checks and balances are vital for maintaining system integrity.
	3. Agree - the Foundation's stewardship can help establish strong security practices.
	**My expertise includes:**
	- Smart contract auditing
	- Formal verification
	- Cryptographic protocol analysis
	- Securing major DeFi protocols`,
    },
    {
      address: '0x07',
      discord: 'delegate7#6789',
      twitter: '@delegate7',
      mirror: 'delegate7.mirror.xyz',
      description: `My passion lies in exploring the intersection of DeFi and layer 2 solutions. I aim to help Optimism become the go-to platform for innovative financial applications.
	The Optimistic Vision aligns well with my beliefs, particularly the focus on creating a more efficient and accessible financial system. The retroactive funding model is an exciting approach to incentivizing development.
	**Thoughts on the Working Constitution:**
	1. Agree - we need the flexibility to adapt to the rapidly evolving DeFi landscape.
	2. Strongly agree - checks and balances are crucial for financial stability.
	3. Agree - the Foundation's guidance is important in these early stages.
	**I bring extensive experience in:**
	- DeFi protocol design
	- Liquidity management
	- Financial risk assessment
	- Involvement in successful DeFi projects`,
    },
    {
      address: '0x08',
      discord: 'delegate8#0123',
      twitter: '@delegate8',
      mirror: 'delegate8.mirror.xyz',
      description: `As an advocate for regulatory compliance, I aim to help Optimism navigate the complex landscape of blockchain regulation. I believe that proactive engagement with regulators is key to long-term success.
	I support the Optimistic Vision, particularly its emphasis on positive impact and sustainable growth. These principles align well with evolving regulatory expectations.
	**Regarding the Working Constitution:**
	1. Agree - flexibility is crucial for adapting to regulatory developments.
	2. Strongly agree - checks and balances are essential for regulatory credibility.
	3. Agree - the Foundation's stewardship can help establish good governance practices.
	**My background includes:**
	- Legal expertise in blockchain technology
	- Experience in liaising with regulatory bodies
	- Deep understanding of global crypto regulations`,
    },
    {
      address: '0x09',
      discord: 'delegate9#4567',
      twitter: '@delegate9',
      mirror: 'delegate9.mirror.xyz',
      description: `My focus is on driving real-world adoption of Optimism through strategic partnerships and business development. I believe that bridging the gap between blockchain technology and traditional industries is crucial for widespread adoption.
	The Optimistic Vision resonates strongly with me, especially its focus on creating tangible positive impact. I'm excited about the potential for Optimism to revolutionize various industries.
	**On the Working Constitution:**
	1. Agree - flexibility is key for adapting to market needs and opportunities.
	2. Strongly agree - checks and balances are important for building trust with partners.
	3. Agree - the Foundation's guidance can help establish credibility in the business world.
	**I bring extensive experience in:**
	- Business development
	- Strategic partnerships
	- Go-to-market strategies in the blockchain space
	- Establishing successful collaborations between blockchain projects and traditional businesses`,
    },
    {
      address: '0x10',
      discord: 'delegate10#8901',
      twitter: '@delegate10',
      mirror: 'delegate10.mirror.xyz',
      description: `As a blockchain educator, my goal is to make Optimism accessible and understandable to a wide audience. I believe that education is key to driving adoption and fostering a vibrant community.
	I'm aligned with the Optimistic Vision, particularly its focus on collective benefit and innovative governance. I'm excited about the opportunity to educate people about these new models.
	**Thoughts on the Working Constitution:**
	1. Agree - flexibility allows us to incorporate learning and feedback.
	2. Strongly agree - checks and balances are important concepts to teach and implement.
	3. Agree - the Foundation's stewardship provides a good case study in blockchain governance.
	**My background includes:**
	- Creating educational content about blockchain technology
	- Organizing workshops and courses
	- Developing curriculum for blockchain education
	- Making complex concepts accessible
	- Contributing to growing Optimism's community through education`,
    },
    {
      address: '0x11',
      discord: 'delegate11#1357',
      twitter: '@delegate11',
      mirror: 'delegate11.mirror.xyz',
      description: `As an environmental sustainability expert, I aim to help Optimism become a leader in eco-friendly blockchain solutions. I believe that technological innovation and environmental responsibility can and should go hand in hand.
	The Optimistic Vision aligns with my belief in creating positive impact, and I'm particularly interested in exploring how Optimism can contribute to sustainability goals.
	**On the Working Constitution:**
	1. Agree - flexibility is crucial for incorporating sustainability practices.
	2. Strongly agree - checks and balances ensure responsible decision-making.
	3. Agree - the Foundation's guidance can help establish sustainability as a core value.
	**My expertise includes:**
	- Environmental impact assessment of blockchain technologies
	- Developing sustainability strategies for tech companies
	- Research on energy-efficient consensus mechanisms
	- Advocacy for green blockchain initiatives`,
    },
    {
      address: '0x12',
      discord: 'delegate12#2468',
      twitter: '@delegate12',
      mirror: 'delegate12.mirror.xyz',
      description: `My focus is on leveraging Optimism for social impact projects. I believe blockchain technology has immense potential to address global challenges and create positive change.
	I'm excited about the Optimistic Vision, particularly its emphasis on collective benefit and innovative funding models. I see great potential for applying these principles to social impact initiatives.
	**Regarding the Working Constitution:**
	1. Agree - flexibility allows for innovative approaches to social problems.
	2. Strongly agree - checks and balances ensure fair and transparent operations.
	3. Agree - the Foundation's stewardship can help guide impactful initiatives.
	**My background includes:**
	- Managing blockchain-based social impact projects
	- Expertise in impact measurement and reporting
	- Experience in non-profit sector and international development
	- Collaborations with NGOs and social enterprises`,
    },
    {
      address: '0x13',
      discord: 'delegate13#3579',
      twitter: '@delegate13',
      mirror: 'delegate13.mirror.xyz',
      description: `As a data scientist, I aim to leverage analytics and machine learning to enhance decision-making within the Optimism ecosystem. I believe data-driven insights can significantly improve governance and protocol performance.
	The Optimistic Vision's focus on experimentation and innovation aligns well with my approach to using data for continuous improvement.
	**Thoughts on the Working Constitution:**
	1. Agree - flexibility allows for data-driven iterations and improvements.
	2. Strongly agree - checks and balances can be reinforced with quantitative analysis.
	3. Agree - the Foundation's stewardship can benefit from data-informed strategies.
	**My expertise includes:**
	- Blockchain data analytics
	- Machine learning for protocol optimization
	- Predictive modeling for governance outcomes
	- Developing data visualization tools for community insights`,
    },
    {
      address: '0x14',
      discord: 'delegate14#4680',
      twitter: '@delegate14',
      mirror: 'delegate14.mirror.xyz',
      description: `My goal is to enhance the user experience and accessibility of Optimism, making it more inclusive for users of all technical backgrounds. I believe that simplifying complex blockchain interactions is key to mass adoption.
	I'm aligned with the Optimistic Vision, especially its focus on creating a more accessible and efficient ecosystem. I'm excited about the potential to make Optimism user-friendly for everyone.
	**On the Working Constitution:**
	1. Agree - flexibility allows for continuous UX improvements.
	2. Strongly agree - checks and balances should also apply to user protection.
	3. Agree - the Foundation's guidance can help prioritize user-centric development.
	**My background includes:**
	- UX/UI design for blockchain applications
	- Conducting user research and usability testing
	- Developing accessible interfaces for diverse user groups
	- Simplifying complex blockchain concepts for mainstream users`,
    },
    {
      address: '0x15',
      discord: 'delegate15#5791',
      twitter: '@delegate15',
      mirror: 'delegate15.mirror.xyz',
      description: `As a cross-chain interoperability expert, I aim to enhance Optimism's connectivity with other blockchain ecosystems. I believe that seamless interaction between different networks is crucial for the overall growth of the blockchain space.
	The Optimistic Vision's focus on collective benefit resonates with my belief in a connected blockchain ecosystem. I'm excited about exploring how Optimism can lead in cross-chain innovations.
	**Regarding the Working Constitution:**
	1. Agree - flexibility is essential for adapting to the evolving multi-chain landscape.
	2. Strongly agree - checks and balances are crucial in managing cross-chain risks.
	3. Agree - the Foundation's stewardship can help guide responsible cross-chain development.
	**My expertise includes:**
	- Designing cross-chain bridges and protocols
	- Implementing interoperability standards
	- Security considerations in multi-chain environments
	- Collaborative projects with multiple blockchain networks`,
    },
  ];

  const [displayCount, setDisplayCount] = useState(10);

  const loadMore = () => {
    setDisplayCount((prevCount) => Math.min(prevCount + 5, delegates.length));
  };

  return (
    <DelegatesContext.Provider
      value={{
        delegates,
        displayedDelegates: delegates.slice(0, displayCount),
        loadMore,
      }}
    >
      {children}
    </DelegatesContext.Provider>
  );
};
