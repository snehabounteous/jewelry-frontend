"use client";

import { useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Anchor,
  Divider,
  Box,
  Stack,
  Center,
  Loader,
  BackgroundImage,
} from "@mantine/core";
import { Star, Diamond, Sparkles } from "lucide-react";
import * as yup from "yup";
import { notifications } from "@mantine/notifications";
import api from "@/utils/axios";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
});

const registerSchema = yup.object().shape({
  name: yup.string().min(2, "Name is too short").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
});

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const payload = isRegister
        ? { name: values.name, email: values.email, password: values.password }
        : { email: values.email, password: values.password };

      const response = await api.post(endpoint, payload);

      if (!isRegister) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        const userResponse = await api.get("/auth/me");
        const user = userResponse.data;

        setUser(user);

        notifications.show({
          title: "Success!",
          message: `Welcome back, ${user.name}!`,
          color: "yellow",
          autoClose: 3000,
        });

        router.push("/");
      } else {
        notifications.show({
          title: "Success!",
          message: "Registration successful! You can now log in.",
          color: "yellow",
          autoClose: 3000,
        });
      }

      form.reset();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.error || error.message,
        color: "red",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    form.reset();
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: "5rem",
          left: "5rem",
          width: "8px",
          height: "8px",
          backgroundColor: "var(--color-accent)",
          borderRadius: "50%",
          opacity: 0.6,
          animation: "pulse 2s infinite",
        }}
      />
      <Box
        style={{
          position: "absolute",
          top: "10rem",
          right: "8rem",
          width: "4px",
          height: "4px",
          backgroundColor: "var(--color-accent)",
          borderRadius: "50%",
          opacity: 0.4,
          animation: "pulse 2s infinite 0.5s",
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: "8rem",
          left: "10rem",
          width: "6px",
          height: "6px",
          backgroundColor: "var(--color-accent)",
          borderRadius: "50%",
          opacity: 0.5,
          animation: "pulse 2s infinite 1s",
        }}
      />

      <Container size="xs" style={{ position: "relative", zIndex: 10 }}>
        <Paper
          shadow="xl"
          radius="xl"
          p="xl"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%, rgba(212,175,55,0.05) 100%)",
              pointerEvents: "none",
            }}
          />

          <Stack gap="lg" style={{ position: "relative", zIndex: 2 }}>
            {/* Header Section */}
            <Stack gap="md" align="center">
              <Center
                style={{
                  width: 64,
                  height: 64,
                  background: "linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)",
                  borderRadius: "1rem",
                  boxShadow: "0 8px 32px rgba(212, 175, 55, 0.3)",
                }}
              >
                <Diamond size={32} color="white" strokeWidth={1.5} />
              </Center>

              <Stack gap={4} align="center">
                <Title
                  order={1}
                  size="2rem"
                  fw={300}
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-primary)",
                    letterSpacing: "0.1em",
                  }}
                >
                  LUMIÈRE
                </Title>

                <Group gap={4}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill="var(--color-accent)"
                      color="var(--color-accent)"
                    />
                  ))}
                </Group>

                <Title
                  order={2}
                  size="1.5rem"
                  fw={300}
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-primary)",
                    marginTop: "0.5rem",
                  }}
                >
                  {isRegister ? "Join Our Collection" : "Welcome Back"}
                </Title>

                <Text
                  size="sm"
                  c="var(--color-secondary)"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                  }}
                >
                  {isRegister ? "Discover timeless elegance" : "Continue your journey with us"}
                </Text>
              </Stack>
            </Stack>

            {/* Form Section */}
            <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                {isRegister && (
                  <TextInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    size="md"
                    radius="lg"
                    {...form.getInputProps("name")}
                    styles={{
                      label: {
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        color: "var(--color-primary)",
                        marginBottom: "0.5rem",
                      },
                      input: {
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        border: "2px solid var(--color-highlight)",
                        fontFamily: "var(--font-body)",
                        "&:focus": {
                          borderColor: "var(--color-accent)",
                          boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.1)",
                        },
                        "&:hover": {
                          borderColor: "#d1d5db",
                        },
                      },
                    }}
                  />
                )}

                <TextInput
                  label="Email Address"
                  placeholder="hello@example.com"
                  size="md"
                  radius="lg"
                  {...form.getInputProps("email")}
                  styles={{
                    label: {
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      color: "var(--color-primary)",
                      marginBottom: "0.5rem",
                    },
                    input: {
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      border: "2px solid var(--color-highlight)",
                      fontFamily: "var(--font-body)",
                      "&:focus": {
                        borderColor: "var(--color-accent)",
                        boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.1)",
                      },
                      "&:hover": {
                        borderColor: "#d1d5db",
                      },
                    },
                  }}
                />

                <PasswordInput
                  label="Password"
                  placeholder="••••••••"
                  size="md"
                  radius="lg"
                  {...form.getInputProps("password")}
                  styles={{
                    label: {
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      color: "var(--color-primary)",
                      marginBottom: "0.5rem",
                    },
                    input: {
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      border: "2px solid var(--color-highlight)",
                      fontFamily: "var(--font-body)",
                      "&:focus": {
                        borderColor: "var(--color-accent)",
                        boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.1)",
                      },
                      "&:hover": {
                        borderColor: "#d1d5db",
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  size="md"
                  radius="lg"
                  fullWidth
                  loading={isLoading}
                  loaderProps={{ color: "white", size: 20 }}
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)",
                    marginTop: "1rem",
                    height: "48px",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(212, 175, 55, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  styles={{
                    root: {
                      "&:hover": {
                        background: "linear-gradient(135deg, #B8860B 0%, #9A7209 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(212, 175, 55, 0.4)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    },
                  }}
                >
                  {isRegister ? "Create Account" : "Sign In"}
                </Button>
              </Stack>
            </Box>

            {/* Divider */}
            <Group gap="md" style={{ margin: "1rem 0" }}>
              <Divider
                style={{
                  flex: 1,
                  background: "linear-gradient(to right, transparent, #d1d5db, transparent)",
                }}
              />
              <Sparkles size={16} color="var(--color-accent)" />
              <Divider
                style={{
                  flex: 1,
                  background: "linear-gradient(to right, transparent, #d1d5db, transparent)",
                }}
              />
            </Group>

            {/* Toggle Section */}
            <Stack gap="xs" align="center">
              <Text size="sm" c="var(--color-secondary)" style={{ fontFamily: "var(--font-body)" }}>
                {isRegister ? "Already have an account?" : "Don't have an account?"}
              </Text>

              <Anchor
                component="button"
                type="button"
                size="sm"
                onClick={toggleAuthMode}
                style={{
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationColor: "var(--color-accent)",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      color: "#B8860B",
                      textDecorationColor: "#B8860B",
                    },
                  },
                }}
              >
                {isRegister ? "Sign In Instead" : "Create New Account"}
              </Anchor>
            </Stack>
          </Stack>
        </Paper>

        {/* Footer */}
        <Text
          size="xs"
          c="var(--color-secondary)"
          ta="center"
          mt="lg"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            opacity: 0.8,
          }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Container>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
}
