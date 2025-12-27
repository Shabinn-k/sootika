import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate=useNavigate()
  return (
    <div className="about-container">
      <button onClick={()=>navigate("/")}>Go back</button>
      <div className="about-hero">
        <h1 className="about-title">Sootika</h1>
        <p className="about-subtitle">
          Premium • Luxury • Timeless Elegance
        </p>
      </div>

      <div className="about-content">
        <h2 className="section-heading">Our Story</h2>
        <p className="section-text">
          Sootika was born from a vision to craft clothing that feels as exceptional
          as it looks. We focus on premium fabrics, detailed craftsmanship, and
          designs that blend simplicity with luxury. Every piece is made to feel
          personal, refined, and effortlessly timeless.
        </p>
      </div>

      <div className="about-content">
        <h2 className="section-heading">What We Stand For</h2>
        <p className="section-text">
          We believe luxury is not loud — it’s felt in the details.
          From fabric selection to final stitching, every step represents our
          commitment to quality. Our goal is to create pieces that elevate your
          everyday experiences in a subtle yet meaningful way.
        </p>
      </div>

      <div className="about-content">
        <h2 className="section-heading">The Sootika Experience</h2>
        <p className="section-text">
          Whether it’s the precision of our tailoring or the softness of our
          premium materials, each product is designed to be a long-lasting part of
          your wardrobe. With Sootika, you don’t just wear fashion — you feel it.
        </p>
      </div>
      <div className="about-content">
  <h2 className="section-heading">Craftsmanship That Defines Us</h2>
  <p className="section-text">
    Every Sootika piece goes through a journey of thoughtful creation.
    From hand-selected fabrics to precisely measured cuts, our artisans
    bring decades of expertise into every stitch. We believe that true
    luxury is not mass-produced; it is crafted slowly, intentionally,
    and with immense care.
  </p>
</div>

<div className="about-content">
  <h2 className="section-heading">The Materials We Choose</h2>
  <p className="section-text">
    Our fabrics are sourced from trusted mills known for their purity,
    softness, and long-lasting durability. Whether it’s ultra-fine cotton,
    organic linen, or premium blends, we choose materials that feel light,
    elegant, and comfortable on your skin. Each collection is tested for
    breathability, strength, and comfort — ensuring a truly effortless
    wearing experience.
  </p>
</div>

<div className="about-content">
  <h2 className="section-heading">A Sustainable Vision</h2>
  <p className="section-text">
    At Sootika, luxury and responsibility go hand in hand.
    Our aim is to reduce waste, encourage conscious fashion,
    and support ethical production practices. We design essentials
    that last — pieces you will return to year after year, not trends
    that fade in a season. Our long-term vision is to create fashion
    that enriches your wardrobe while respecting the world we live in.
  </p>
</div>

<div className="about-content">
  <h2 className="section-heading">Designed for the Modern Minimalist</h2>
  <p className="section-text">
    Every collection celebrates clean silhouettes, neutral palettes,
    and subtle detailing — the kind of understated luxury that never
    goes out of style. Whether you're dressing for a calm day or a
    meaningful moment, Sootika elevates your presence quietly yet
    confidently.
  </p>
</div>

<div className="about-content">
  <h2 className="section-heading">Why Sootika</h2>
  <p className="section-text">
    Because we believe fashion is personal. It is a reflection of who
    you are, how you feel, and how you choose to show up in the world.
    Our mission is simple — to create clothing that inspires confidence,
    comfort, and timeless elegance. With Sootika, you’re not just wearing
    a brand; you’re embracing a lifestyle rooted in quality and intention.
  </p>
</div>

    </div>
  );
};

export default About;