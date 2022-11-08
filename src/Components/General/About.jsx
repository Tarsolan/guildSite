import React from "react";
import guild_new from "../../utils/images/guild_new.jpg";
import guild_old from "../../utils/images/guild_old.jpg";
import styles from "./css/about.module.css";

const About = () => {
  return (
    <div id={styles.aboutContainer}>
      <h2>East Annwm Adventurer's Guild</h2>
      <p>
        Welcome, friend! You've found the webiste of the intrepid EAG! I can
        only assume this means you've heard about how amazing we are and want to
        hire us. Let me take a moment and say... that's totally great. You've
        made an amazing choice.
      </p>
      <img src={guild_new} alt="" />
      <h2>About Us</h2>
      <p>
        The East Annwm Adventurer's Guild was formed in 2018 by a group of four
        individuals - Degren Brightforge, Talia Swanheart, Pierre Grabner, and
        Auron Warfield. It quickly grew to become the largest organized group in
        its origin settlement of Holdfast, and expanded into nearby Applevale
        within a year.
      </p>
      <p>
        We created this organization in order to help people. We wanted to make
        a difference in the world around us, and we wanted to find a better way
        to earn a living than just scavenging what we could from the land around
        Holdfast. We all have unique skills, we just needed a way to use them.
      </p>
      <p>
        We specialize in a wide variety of tasks, ranging from crafting arms and
        armor to crafting farm equipment. We have skilled researchers,
        alchemists, and fighters. If there is a task that needs doing, the East
        Annwm Adventurer's Guild are the ones to do it.
      </p>
      <img src={guild_old} alt="" />
    </div>
  );
};

export default About;
