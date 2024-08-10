import Markdown from 'react-markdown'
import Header from "../../components/Header"

const About = () => {
  const about = `
# About GreenAmber

Welcome to **GreenAmber.org**, where we champion the transformative power of the waste-to-energy movement. 
Our mission is to turn today's waste into tomorrow's energy, contributing to a cleaner, greener planet.

## Why "GreenAmber"?

Our name reflects our vision and values. **"Green"** represents the commitment to renewable, sustainable energy sources that protect our environment. 
**"Amber,"** the color of energy, signifies the dynamic and powerful force that drives our movement. 
Together, GreenAmber symbolizes the harmony between nature and innovation, leading the way to a brighter, more sustainable future.

## Our Mission

At GreenAmber.org, we believe that waste is not the end, but a beginning. By converting waste into energy, we aim to reduce landfill use, lower greenhouse gas emissions, 
and create a circular economy where resources are reused and regenerated.

## What We Do

- **Education & Awareness**: We provide resources, articles, and guides to educate the public on the benefits of waste-to-energy technologies.
- **Advocacy**: We support policies and initiatives that promote sustainable waste management and energy production.
- **Community Engagement**: We connect individuals, organizations, and communities passionate about reducing waste and embracing renewable energy.

## Join Us

Whether you're a sustainability enthusiast, a policy maker, or someone curious about the future of energy, GreenAmber.org is your platform to learn, share, and act. 
Together, we can make waste-to-energy a cornerstone of the green revolution.

  `

  return (
    <>
      <div className="w-full md:w-600">
        <Header title="Our Community" />

        <div
          className="h-[92vh] overflow-y-auto p-4 border-b border-dim-200 transition duration-350 ease-in-out pb-4 border-l border-r">
          <Markdown className="flex flex-col prose prose-strong:text-amber-600 prose-h1:text-gray-500 prose-h2:text-gray-500 text-gray-400">
            {about}
          </Markdown>
        </div>
      </div>
    </>
  )
}

export default About;