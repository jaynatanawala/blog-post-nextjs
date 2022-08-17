import React, { Fragment } from "react";
import classes from "./hero.module.css";
import Image from "next/image";

function Hero(props) {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={"/images/site/max-unsplash.jpg"}
          alt="img"
          width={300}
          height={300}
        />
      </div>
      <h1>I am, Max</h1>
      <p>description</p>
    </section>
  );
}

export default Hero;
