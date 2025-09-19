"use client";

import { Box, Container, Group, Center, Text, Title } from "@mantine/core";
import { Diamond, Star } from "lucide-react";

export default function Footer() {
  return (
    <Box style={{ background: 'var(--color-primary)' }} py="3rem">
      <Container size="xl">
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
              c="white"
              style={{
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.1em',
              }}
            >
              LUMIÈRE
            </Title>
          </Group>

          <Text size="sm" c="rgba(255, 255, 255, 0.6)" style={{ fontFamily: 'var(--font-body)' }}>
            © 2024 Lumière. All rights reserved.
          </Text>

          <Group gap="md">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
            ))}
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
