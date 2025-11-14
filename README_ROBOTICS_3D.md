# Robotics Lab 3D - OpenGL Conversion

## Overview

This is a 3D OpenGL conversion of the robotics lab simulation that preserves all the original Ackermann kinematics and Pure Pursuit lane-keeping logic while adding immersive 3D visualization.

## Features

### 3D Rendering
- **First-person hood camera view** - Experience the simulation from the driver's perspective
- **3D track visualization** - São Paulo F1 circuit rendered with realistic road surface and lane markings
- **Elevated terrain** - Green terrain walls around the track to clearly distinguish the drivable area
- **3D lane detection markers** - Visual spheres showing detected lane points in the 3D world

### Minimap (Top-Right Corner)
- **Full 2D simulation view** - The original 2D visualization as a minimap
- Shows track layout, car position, camera FOV, detected lanes, and LKA lookahead point
- All original visualization elements preserved

### Preserved Logic
- ✅ **Ackermann steering kinematics** - Exact same physics model
- ✅ **Camera sensor model** - Same field of view, range, and detection logic
- ✅ **Pure Pursuit LKA controller** - Identical lane-keeping algorithm
- ✅ **All control parameters** - Speed, steering, lookahead distances unchanged

## Controls

- **W** - Accelerate
- **S** - Brake/Reverse
- **A** - Steer left (deactivates LKA)
- **D** - Steer right (deactivates LKA)
- **F** - Toggle Lane Keeping Assist (LKA) on/off
- **ESC** - Exit simulation

## Requirements

```bash
pip install pygame PyOpenGL PyOpenGL_accelerate numpy
```

## Running the Simulation

### Option 1: Direct Run (if you have a display)
```bash
python3 robotics_lab_3d.py
```

### Option 2: Using the Helper Script (handles display setup)
```bash
./run_robotics_3d.sh
```
This script automatically detects your environment and uses Xvfb if needed.

### Option 3: For Headless/SSH Environments
```bash
# Install Xvfb if not already installed
sudo apt-get install xvfb

# Run with virtual display
xvfb-run -s "-screen 0 1920x1080x24" python3 robotics_lab_3d.py
```

## Troubleshooting

If you encounter display or OpenGL errors, see **[TROUBLESHOOTING_3D.md](TROUBLESHOOTING_3D.md)** for detailed solutions.

Common quick fixes:
```bash
# For "Could not get EGL display" error
export SDL_VIDEO_X11_FORCE_EGL=0
python3 robotics_lab_3d.py

# For hardware acceleration issues
export LIBGL_ALWAYS_SOFTWARE=1
python3 robotics_lab_3d.py

# For SSH sessions
ssh -X user@host
python3 robotics_lab_3d.py
```

## Technical Details

### Architecture
- **Pygame + PyOpenGL hybrid** - Combines Pygame for event handling and 2D overlays with OpenGL for 3D rendering
- **Modern OpenGL** - Uses OpenGL fixed pipeline for simplicity and compatibility
- **Efficient rendering** - Separates 3D scene rendering from 2D HUD overlay

### Key Components

1. **Car Class** - Ackermann steering model with 3D rendering methods
2. **CameraSensor Class** - Lane detection with original FOV and range logic
3. **PurePursuitLKA Class** - Pure Pursuit algorithm for autonomous lane keeping
4. **SaoPauloTrack Class** - Track layout with 3D rendering (flat road + elevated terrain)
5. **Renderer3D Class** - OpenGL 3D scene management and lighting
6. **Minimap Class** - 2D top-down view reusing original visualization code
7. **HUD Class** - Heads-up display showing telemetry and status

### Visual Elements

#### 3D Scene
- Dark gray road surface with white lane boundaries
- Yellow dashed center line
- Green elevated terrain walls (30-unit height)
- Red spheres for left lane detections
- Cyan spheres for right lane detections
- Yellow spheres for center line detections
- Large yellow sphere for LKA lookahead point

#### Minimap (400x400px)
- Track outline with lane markings
- Camera FOV cone (semi-transparent green)
- Detected lane points (colored dots)
- Car representation with heading indicator
- LKA lookahead point and path

#### HUD
- LKA status (ACTIVE in green / OFF in red)
- Speed display
- Steering angle display
- Lane detection status (current lane, left/right detection)
- Control hints at bottom

## Differences from Original

### Added
- 3D first-person hood camera view
- 3D terrain visualization
- 3D lane detection markers
- Perspective projection and lighting
- Minimap in corner showing original 2D view

### Unchanged
- All physics calculations
- All control logic
- All detection algorithms
- All parameters and gains

## Performance

- Target: 60 FPS
- Optimized for real-time interaction
- Efficient OpenGL rendering with lighting and depth testing

## Future Enhancements (Optional)

- Add elevation changes to the road surface itself
- Implement multiple camera views (chase cam, top-down, etc.)
- Add more detailed car model
- Include track-side objects (barriers, signs, trees)
- Add motion blur or other visual effects
- Implement picture-in-picture camera view showing raw sensor feed

## Credits

Based on the original 2D pygame simulation with Ackermann steering kinematics and Pure Pursuit lane keeping controller.
