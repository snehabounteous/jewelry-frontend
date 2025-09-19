import { Container, Group, Center, Text, Title } from "@mantine/core";
import { Diamond, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--color-primary)" }}
      aria-label="Footer"
    >
      <Container size="xl" py="3rem">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <Group gap="md" aria-label="Brand logo">
            <Center
              style={{
                width: 40,
                height: 40,
                background:
                  "linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)",
                borderRadius: "0.5rem",
              }}
            >
              <Diamond
                size={20}
                color="white"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Center>
            <Title
              order={3}
              c="white"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.1em",
              }}
            >
              LUMIÈRE
            </Title>
          </Group>
          <Text
            component="p"
            size="sm"
            c="rgba(255, 255, 255, 0.6)"
            style={{ fontFamily: "var(--font-body)", order: 2 }}
          >
            © 2024 Lumière. All rights reserved.
          </Text>

          <Group gap="md" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill="var(--color-accent)"
                color="var(--color-accent)"
              />
            ))}
          </Group>
        </div>
      </Container>
    </footer>
  );
}
