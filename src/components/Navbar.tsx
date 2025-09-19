"use client";
import Link from "next/link";

import { useState } from "react";
import {
  Box,
  Container,
  Title,
  Group,
  Anchor,
  ActionIcon,
  Center,
  Paper,
  Button,
  Divider,
  Stack,
} from "@mantine/core";
import {
  Diamond,
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
} from "lucide-react";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Box
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
      <Container size="xl" py="md">
        <Group justify="space-between" align="center">
          {/* ---------- Logo ---------- */}
          <Group gap="md">
            <Center
              style={{
                width: 40,
                height: 40,
                background:
                  "linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)",
                borderRadius: "0.5rem",
              }}
            >
              <Diamond size={20} color="white" strokeWidth={1.5} />
            </Center>
            <Title
              order={3}
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-primary)",
                letterSpacing: "0.1em",
              }}
            >
              LUMIÈRE
            </Title>
          </Group>

          {/* ---------- Links ---------- */}
          <Group gap="xl" visibleFrom="md">
            <Anchor
              href="#"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Collections
            </Anchor>
            <Anchor
              href="#"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              About
            </Anchor>
            <Anchor
              href="#"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Services
            </Anchor>
            <Anchor
              href="#"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Contact
            </Anchor>
          </Group>

          {/* ---------- Icons & Profile ---------- */}
          <Group gap="md" style={{ position: "relative" }}>
            <ActionIcon variant="subtle" size="lg">
              <Search size={20} color="var(--color-primary)" />
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg">
              <Heart size={20} color="var(--color-primary)" />
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg">
              <ShoppingBag size={20} color="var(--color-primary)" />
            </ActionIcon>

            {/* Profile Dropdown */}
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={() => setDropdownOpen((o) => !o)}
            >
              <User size={20} color="var(--color-primary)" />
            </ActionIcon>

            {dropdownOpen && (
              <Paper
                shadow="md"
                p="sm"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 10,
                  width: 220,
                  borderRadius: 8,
                  background: "var(--color-background)", // ✅ fixed background
                  color: "var(--color-text-dark)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Stack gap="sm">
                  <Anchor href="#" style={{ color: "var(--color-primary)" }}>
                    My Account
                  </Anchor>
                  <Anchor href="#" style={{ color: "var(--color-primary)" }}>
                    Wishlist
                  </Anchor>
                  <Anchor href="#" style={{ color: "var(--color-primary)" }}>
                    Check Order/Initiate Return
                  </Anchor>
                  <Anchor href="#" style={{ color: "var(--color-primary)" }}>
                    Store Finder
                  </Anchor>

                  <Divider />

                  <Group
                    justify="space-between"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    <span>Language</span>
                    <span>EN 🇮🇳</span>
                  </Group>

                  <Divider />

                  {isLoggedIn ? (
                    <Button
                      fullWidth
                      style={{
                        background: "var(--color-primary)",
                        color: "var(--color-text-light)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      LOGOUT
                    </Button>
                  ) : (
                    <>
                      {/* ✅ LOGIN button navigates to /auth */}
                      <Link href="/auth" style={{ width: "100%" }}>
                        <Button
                          fullWidth
                          style={{
                            background: "var(--color-primary)",
                            color: "var(--color-text-light)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          LOGIN
                        </Button>
                      </Link>

                      {/* ✅ JOIN US button navigates to /auth?mode=signup */}
                      {/* <Link href="/auth?mode=signup" style={{ width: "100%" }}>
                        <Button
                          fullWidth
                          variant="outline"
                          style={{
                            borderColor: "var(--color-primary)",
                            color: "var(--color-primary)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          JOIN US
                        </Button>
                      </Link> */}
                    </>
                  )}
                </Stack>
              </Paper>
            )}

            <ActionIcon variant="subtle" size="lg" hiddenFrom="md">
              <Menu size={20} color="var(--color-primary)" />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
