"use client";

import { useState, useEffect } from "react";
import { Box, Container, Title, Group, Anchor, ActionIcon, Center } from "@mantine/core";
import { Diamond, Search, Heart, ShoppingBag, User, Menu } from "lucide-react";

export default function ScrollNavigation() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between" align="center">
          <Group gap="md">
            <Center
              style={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)',
                borderRadius: '0.5rem',
              }}
            >
              <Diamond size={20} color="white" strokeWidth={1.5} />
            </Center>
            <Title
              order={3}
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-primary)',
                letterSpacing: '0.1em',
              }}
            >
              LUMIÈRE
            </Title>
          </Group>

          <Group gap="xl" visibleFrom="md">
            <Anchor href="#" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              Collections
            </Anchor>
            <Anchor href="#" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              About
            </Anchor>
            <Anchor href="#" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              Services
            </Anchor>
            <Anchor href="#" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              Contact
            </Anchor>
          </Group>

          <Group gap="md">
            <ActionIcon variant="subtle" size="lg">
              <Search size={20} color="var(--color-primary)" />
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg">
              <Heart size={20} color="var(--color-primary)" />
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg">
              <ShoppingBag size={20} color="var(--color-primary)" />
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg">
              <User size={20} color="var(--color-primary)" />
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg" hiddenFrom="md">
              <Menu size={20} color="var(--color-primary)" />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
