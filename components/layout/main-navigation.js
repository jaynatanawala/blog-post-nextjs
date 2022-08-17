import React from "react";
import Logo from "./logo";
import Link from "next/link";

import classes from "./main-navigation.module.css";

function MainNavigation(props) {
  return (
    <header className={classes.header}>
      <Link href={"/"}>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href={"/posts"}>Posts</Link>
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;