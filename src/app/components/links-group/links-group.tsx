import { useState } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './links-group.module.css';
import { NavLink } from 'react-router-dom';
import { HasNavLink } from '../has-nav-link';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}
// icon: Icon,
export const LinksGroup: React.FC<LinksGroupProps> = ({ icon: Icon, label, link, initiallyOpened, links }) => {
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
    <>
      <HasNavLink hasLinks={hasLinks} link={link}>
        <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
          <Group justify="space-between" gap={0}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size={18} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <FaChevronRight
                className={classes.chevron}
                size={16}
                style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
              />
            )}
          </Group>
        </UnstyledButton>
      </HasNavLink>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
