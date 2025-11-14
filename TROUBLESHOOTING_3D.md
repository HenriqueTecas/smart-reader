# Troubleshooting Guide - 3D Robotics Simulation

## Common Issues and Solutions

### 1. "Could not get EGL display" Error

**Problem:** OpenGL cannot access your display.

**Solutions:**

#### A. Check if you have a display
```bash
echo $DISPLAY
```
If this is empty, you need to set up X11 or use a virtual display.

#### B. For Local Systems (with GUI)
1. Make sure you're running from a terminal in your graphical environment (not SSH)
2. Install required OpenGL libraries:
```bash
sudo apt-get update
sudo apt-get install libgl1-mesa-glx libglu1-mesa mesa-utils
```

3. Test OpenGL:
```bash
glxinfo | grep "OpenGL version"
```

#### C. For SSH/Remote Systems
Use X11 forwarding:
```bash
ssh -X username@hostname
# Then run the simulation
python3 robotics_lab_3d.py
```

Or use the helper script which will automatically use Xvfb:
```bash
./run_robotics_3d.sh
```

#### D. For Headless/Virtual Environments
Install and use Xvfb (X Virtual Framebuffer):
```bash
# Install Xvfb
sudo apt-get install xvfb

# Run with Xvfb
xvfb-run -s "-screen 0 1920x1080x24" python3 robotics_lab_3d.py

# Or use the helper script
./run_robotics_3d.sh
```

### 2. "pygame.error: No video mode large enough" Error

**Problem:** The window size is too large for your screen.

**Solution:** Edit `robotics_lab_3d.py` and reduce the window size:
```python
# Change these lines (around line 44-45)
WIDTH = 1280  # Was 1600
HEIGHT = 720  # Was 900
MINIMAP_SIZE = 300  # Was 400
```

### 3. Black Screen or Graphics Artifacts

**Problem:** Graphics driver or OpenGL rendering issues.

**Solutions:**

#### Try Software Rendering
```bash
export LIBGL_ALWAYS_SOFTWARE=1
python3 robotics_lab_3d.py
```

#### Update Graphics Drivers
For NVIDIA:
```bash
sudo apt-get install nvidia-driver-XXX  # Replace XXX with version
```

For AMD:
```bash
sudo apt-get install mesa-vulkan-drivers
```

For Intel:
```bash
sudo apt-get install mesa-utils mesa-utils-extra
```

### 4. Low FPS / Performance Issues

**Solutions:**

1. **Reduce window size** (see solution #2)

2. **Disable lighting** (edit the code):
```python
# In setup_opengl() method, comment out:
# glEnable(GL_LIGHTING)
# glEnable(GL_LIGHT0)
```

3. **Reduce minimap size**:
```python
MINIMAP_SIZE = 200  # Smaller minimap
```

4. **Check if hardware acceleration is enabled**:
```bash
glxinfo | grep "direct rendering"
# Should show "direct rendering: Yes"
```

### 5. "ModuleNotFoundError" Errors

**Problem:** Missing dependencies.

**Solution:** Install all required packages:
```bash
pip3 install pygame PyOpenGL PyOpenGL_accelerate numpy
```

Or if using conda/virtualenv, make sure you've activated your environment first.

### 6. Running in WSL (Windows Subsystem for Linux)

**Problem:** WSL doesn't have native OpenGL support by default.

**Solutions:**

#### WSL2 with WSLg (Windows 11)
If you have Windows 11 with WSL2, WSLg provides native GUI support:
```bash
# Should work directly
python3 robotics_lab_3d.py
```

#### WSL1 or WSL2 without WSLg
Use VcXsrv or Xming:

1. Install VcXsrv on Windows
2. Launch XLaunch with "Disable access control" checked
3. In WSL, set DISPLAY:
```bash
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0
python3 robotics_lab_3d.py
```

#### Alternative: Use Windows Native Python
Run the simulation directly in Windows with Python installed natively.

### 7. Permission Denied or "Cannot open display"

**Solutions:**

```bash
# Give X server access
xhost +local:

# Or for specific user
xhost +SI:localuser:$(whoami)

# Then run
python3 robotics_lab_3d.py
```

### 8. Virtual Machine Issues

**Problem:** Running in VirtualBox/VMware without 3D acceleration.

**Solutions:**

1. **Enable 3D Acceleration in VM settings:**
   - VirtualBox: Settings → Display → Enable 3D Acceleration
   - VMware: Settings → Display → Accelerate 3D graphics

2. **Install Guest Additions/Tools:**
   - VirtualBox: Install Guest Additions
   - VMware: Install VMware Tools

3. **Use software rendering:**
```bash
export LIBGL_ALWAYS_SOFTWARE=1
python3 robotics_lab_3d.py
```

## Quick Diagnostic Commands

Run these to diagnose your system:

```bash
# Check display
echo "DISPLAY: $DISPLAY"

# Check OpenGL
glxinfo | grep "OpenGL"

# Check SDL video drivers
python3 -c "import pygame; pygame.init(); print(pygame.display.get_driver())"

# Check available displays
ls /tmp/.X11-unix/

# Test simple OpenGL
glxgears
```

## Still Having Issues?

If none of these solutions work:

1. **Fallback to 2D version:** Use the original 2D pygame simulation instead
2. **Check system requirements:**
   - Python 3.7+
   - OpenGL 2.1+
   - Working X server or virtual display
3. **Provide error details:** Share the full error output when asking for help

## System-Specific Notes

### Ubuntu/Debian
Usually works out of the box with proper drivers installed.

### Arch Linux
May need to install `mesa` package:
```bash
sudo pacman -S mesa
```

### macOS
Should work natively with system Python and pip-installed packages.

### Docker/Containers
Requires X11 forwarding or Xvfb:
```bash
docker run -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix your_image
```

Or use Xvfb inside container:
```dockerfile
RUN apt-get install -y xvfb
CMD xvfb-run python3 robotics_lab_3d.py
```

## Environment Variables Reference

```bash
# Force software rendering
export LIBGL_ALWAYS_SOFTWARE=1

# Use GLX instead of EGL
export SDL_VIDEO_X11_FORCE_EGL=0
export PYOPENGL_PLATFORM=glx

# Debug SDL video
export SDL_DEBUG=1

# Set display
export DISPLAY=:0  # or :1, etc.
```
