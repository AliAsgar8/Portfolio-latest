"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

type ThemeColors = {
  fills: string[];
  strokes: string[];
  attractor: string;
};

function getThemeColors(isDark: boolean): ThemeColors {
  if (isDark) {
    // Match anuragsinghbam.netlify.app palette
    return {
      fills: ["#222222", "#27292d", "#444444", "#334443", "#191919"],
      strokes: ["#0a0a0a", "#111111"],
      attractor: "#000000",
    };
  }

  return {
    fills: ["#e8e4dc", "#ddd8ce", "#cfc9bd", "#d4cfc4", "#ebe7df"],
    strokes: ["#c4beb2", "#b8b2a6"],
    attractor: "#ffffff",
  };
}

export function MatterBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Body,
      World,
      Events,
      Common,
    } = Matter;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    let isDark = document.documentElement.classList.contains("dark");
    let colors = getThemeColors(isDark);

    const engine = Engine.create();
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;
    engine.world.gravity.scale = 0;

    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        showAngleIndicator: false,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });

    render.canvas.style.pointerEvents = "none";
    render.canvas.style.width = "100%";
    render.canvas.style.height = "100%";
    render.canvas.setAttribute("aria-hidden", "true");

    const attractorRadius = Math.max(width / 25, height / 25) / 2;
    const attractiveBody = Bodies.circle(width / 2, height / 2, attractorRadius, {
      isStatic: true,
      render: {
        fillStyle: colors.attractor,
        strokeStyle: colors.attractor,
        lineWidth: 0,
      },
    });

    World.add(engine.world, attractiveBody);

    const bodies: Matter.Body[] = [];

    for (let i = 0; i < 60; i += 1) {
      const x = Common.random(0, width);
      const y = Common.random(0, height);
      const s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
      const polygonSides = Math.round(Common.random(3, 6));
      const r = Common.random(0, 1);

      const polygon = Bodies.polygon(x, y, polygonSides, s, {
        mass: s / 20,
        friction: 0,
        frictionAir: 0.02,
        angle: Math.round(Math.random() * 360),
        render: {
          fillStyle: colors.fills[0],
          strokeStyle: colors.strokes[0],
          lineWidth: 2,
        },
      });
      bodies.push(polygon);

      bodies.push(
        Bodies.circle(x, y, Common.random(2, 8), {
          mass: 0.1,
          friction: 0,
          frictionAir: 0.01,
          render: {
            fillStyle: r > 0.3 ? colors.fills[1] : colors.fills[2],
            strokeStyle: colors.strokes[0],
            lineWidth: 2,
          },
        }),
      );

      bodies.push(
        Bodies.circle(x, y, Common.random(2, 20), {
          mass: 6,
          friction: 0,
          frictionAir: 0,
          render: {
            fillStyle: r > 0.3 ? colors.fills[3] : colors.fills[0],
            strokeStyle: colors.strokes[1],
            lineWidth: 4,
          },
        }),
      );

      bodies.push(
        Bodies.circle(x, y, Common.random(2, 30), {
          mass: 0.2,
          friction: 0.6,
          frictionAir: 0.8,
          render: {
            fillStyle: colors.fills[4],
            strokeStyle: colors.strokes[1],
            lineWidth: 3,
          },
        }),
      );
    }

    World.add(engine.world, bodies);

    const mouse = { x: width / 2, y: height / 2 };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    Events.on(engine, "afterUpdate", () => {
      Body.translate(attractiveBody, {
        x: (mouse.x - attractiveBody.position.x) * 0.12,
        y: (mouse.y - attractiveBody.position.y) * 0.12,
      });

      // Same attractor force as matter-attractors in the reference
      for (const body of bodies) {
        Body.applyForce(body, body.position, {
          x: (attractiveBody.position.x - body.position.x) * 1e-6,
          y: (attractiveBody.position.y - body.position.y) * 1e-6,
        });

        // Soft wrap so shapes stay in the hero viewport
        const buffer = 80;
        let nx = body.position.x;
        let ny = body.position.y;
        if (nx > width + buffer) nx = -buffer;
        if (nx < -buffer) nx = width + buffer;
        if (ny > height + buffer) ny = -buffer;
        if (ny < -buffer) ny = height + buffer;
        if (nx !== body.position.x || ny !== body.position.y) {
          Body.setPosition(body, { x: nx, y: ny });
        }
      }
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const applyThemeColors = () => {
      isDark = document.documentElement.classList.contains("dark");
      colors = getThemeColors(isDark);
      attractiveBody.render.fillStyle = colors.attractor;
      attractiveBody.render.strokeStyle = colors.attractor;

      bodies.forEach((body, index) => {
        const fill = colors.fills[index % colors.fills.length];
        const stroke = colors.strokes[index % colors.strokes.length];
        body.render.fillStyle = fill;
        body.render.strokeStyle = stroke;
      });
    };

    const themeObserver = new MutationObserver(applyThemeColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      render.canvas.width = width;
      render.canvas.height = height;
      render.options.width = width;
      render.options.height = height;
      Render.setPixelRatio(render, Math.min(window.devicePixelRatio || 1, 2));
    };

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
      Events.off(engine, "afterUpdate");
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
      render.textures = {};
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    />
  );
}
