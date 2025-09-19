"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Title,
  Group,
  Anchor,
  ActionIcon,
  Paper,
  Button,
  Divider,
  Stack,
  Drawer,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { MantineProvider, useMantineTheme } from "@mantine/core";

export default function Navbar() {
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpened, { open: openMobileMenu, close: closeMobileMenu }] =
    useDisclosure(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = !!user;

  // Check for Mantine's `md` breakpoint (768px)
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Automatically close the mobile menu if the screen size changes to desktop
  useEffect(() => {
    if (isDesktop && mobileMenuOpened) {
      closeMobileMenu();
    }
  }, [isDesktop, mobileMenuOpened, closeMobileMenu]);

  // Logout function
  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
    closeMobileMenu();
  };

  const navLinks = ["Collections", "About", "Services", "Contact"];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--color-highlight)",
        }}
      >
        <Container size="xl" py={16}>
          <Group justify="space-between" align="center" gap="lg">
            {/* Logo */}
            <Group gap="xs">
              <Image
                src="/icon.svg"
                alt="LUMIÈRE Logo"
                width={40}
                height={40}
                priority
              />
              <Title
                order={3}
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-primary)",
                }}
              >
                LUMIÈRE
              </Title>
            </Group>

            {/* Desktop Links */}
            <Group
              gap="lg"
              className="hidden md:flex"
              component="ul"
              role="menubar"
            >
              {navLinks.map((item) => (
                <li key={item} role="none">
                  <Anchor
                    component={Link}
                    href="#"
                    role="menuitem"
                    style={{
                      color: "var(--color-primary)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </Anchor>
                </li>
              ))}
            </Group>

            {/* Icons & Profile */}
            <Group gap="sm" style={{ position: "relative" }}>
              <ActionIcon variant="subtle" size="lg" aria-label="Search">
                <Search size={20} color="var(--color-primary)" />
              </ActionIcon>

              <ActionIcon variant="subtle" size="lg" aria-label="Wishlist">
                <Heart size={20} color="var(--color-primary)" />
              </ActionIcon>

              <ActionIcon variant="subtle" size="lg" aria-label="Shopping Bag">
                <ShoppingBag size={20} color="var(--color-primary)" />
              </ActionIcon>

              <Box>
                <Button
                  color="black"
                  onClick={() => setDropdownOpen((o) => !o)}
                  rightSection={<User size={18} />}
                  size="compact-md"
                >
                  {isLoggedIn ? `Hi, ${user.name}` : "Login"}
                </Button>

                {dropdownOpen && isLoggedIn && (
                  <Paper
                    ref={menuRef}
                    shadow="md"
                    p="sm"
                    style={{
                      position: "absolute",
                      top: 40,
                      right: 0,
                      width: 220,
                      borderRadius: 8,
                      background: "var(--color-background)",
                      zIndex: 101,
                    }}
                  >
                    <Stack gap="xs">
                      <Anchor
                        href="#"
                        style={{ color: "var(--color-primary)" }}
                      >
                        My Account
                      </Anchor>
                      <Anchor
                        href="#"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Wishlist
                      </Anchor>
                      <Anchor
                        href="#"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Orders & Returns
                      </Anchor>
                      <Divider />
                      <Button
                        fullWidth
                        variant="light"
                        style={{ color: "var(--color-primary)" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Stack>
                  </Paper>
                )}
              </Box>

              <ActionIcon
                variant="subtle"
                size="lg"
                className="md:hidden"
                onClick={openMobileMenu}
                aria-label="Open mobile menu"
              >
                <Menu size={20} color="var(--color-primary)" />
              </ActionIcon>
            </Group>
          </Group>
        </Container>
      </nav>

      <Drawer
        opened={mobileMenuOpened}
        onClose={closeMobileMenu}
        position="right"
        size="xs"
        withCloseButton={false}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        style={{
          background: "var(--color-background)",
        }}
      >
        <Stack gap="xl" p="md">
          <Group justify="space-between" align="center" mt="sm">
            <Anchor component={Link} href="#">
              <Group gap="xs">
                <Image
                  src="/icon.svg"
                  alt="LUMIÈRE Logo"
                  width={30}
                  height={30}
                />
                <Title order={4} style={{ fontFamily: "var(--font-heading)" }}>
                  LUMIÈRE
                </Title>
              </Group>
            </Anchor>
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <X size={20} color="var(--color-primary)" />
            </ActionIcon>
          </Group>

          <Divider />

          {navLinks.map((item) => (
            <Anchor
              key={item}
              component={Link}
              href="#"
              onClick={closeMobileMenu}
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "1.2rem",
              }}
            >
              {item}
            </Anchor>
          ))}

          <Divider />

          {isLoggedIn ? (
            <Stack>
              <Anchor href="#" style={{ color: "var(--color-primary)" }}>
                My Account
              </Anchor>
              <Anchor href="#" style={{ color: "var(--color-primary)" }}>
                Wishlist
              </Anchor>
              <Anchor href="#" style={{ color: "var(--color-primary)" }}>
                Orders & Returns
              </Anchor>
              <Button
                fullWidth
                variant="light"
                style={{ color: "var(--color-primary)" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            <Button
              fullWidth
              variant="light"
              style={{ color: "var(--color-primary)" }}
              onClick={closeMobileMenu}
              component={Link}
              href="#"
            >
              Login / Sign Up
            </Button>
          )}
        </Stack>
      </Drawer>
    </>
  );
}