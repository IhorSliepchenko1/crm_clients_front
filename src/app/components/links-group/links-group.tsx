import classes from "./links-group.module.scss";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { HasNavLink } from "../layout/has-nav-link";
import { ROLES } from "../../types";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  onClick?: () => void
  logout?: boolean
  access: [ROLES]
  role: ROLES
}
export const LinksGroup: React.FC<LinksGroupProps> = ({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
  onClick,
  logout = false,
  role,
  access
}) => {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasLinks ? links : []).map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={classes.link}
    >
      {link.label}
    </NavLink>
  ));

  return (
    access.indexOf(role) > -1 &&
    <>
      <HasNavLink hasLinks={hasLinks} link={link}>
        <UnstyledButton onClick={logout ? onClick : () => setOpened((o) => !o)} className={classes.control}>
          <Group justify="space-between" gap={0}>

            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={25}>
                <Icon size={15} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>

            {hasLinks && (
              <FaChevronRight
                className={classes.chevron}
                size={13}
                style={{ transform: opened ? "rotate(-90deg)" : "none" }}
              />
            )}

          </Group>
        </UnstyledButton>
      </HasNavLink>

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>


  )
}
