/* ========== Matrix Rain Background ========== */

const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas.getContext('2d');

function resizeMatrix() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
}
resizeMatrix();
window.addEventListener('resize', resizeMatrix);

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]=/\\|';
const fontSize = 14;
let columns = Math.floor(matrixCanvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  matrixCtx.fillStyle = 'rgba(10, 10, 15, 0.05)';
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  matrixCtx.fillStyle = '#00ff41';
  matrixCtx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  columns = Math.floor(matrixCanvas.width / fontSize);
  drops = Array(columns).fill(1);
});

/* ========== Navbar ========== */

const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
  navbarToggle.classList.toggle('active');
});

/* ========== Type Writer Effect ========== */

const words = ["User Data", "IT Student", "Web Developer", "Green Hat Hacker", "CTF Player", "Cyber Enthusiast"];
const textElement = document.getElementById("words");

let wordIndex = 0;
let charIndex = 0;

const typingSpeed = 80;
const deletingSpeed = 40;
const pauseBetweenWords = 2000;

function type() {
  if (wordIndex < words.length) {
    const currentWord = words[wordIndex];
    if (charIndex < currentWord.length) {
      textElement.textContent += currentWord.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(deleteWord, pauseBetweenWords);
    }
  } else {
    wordIndex = 0;
    charIndex = 0;
    setTimeout(type, pauseBetweenWords);
  }
}

function deleteWord() {
  const currentWord = words[wordIndex];
  if (textElement.textContent.length > 0) {
    textElement.textContent = currentWord.substring(0, textElement.textContent.length - 1);
    setTimeout(deleteWord, deletingSpeed);
  } else {
    wordIndex++;
    charIndex = 0;
    setTimeout(type, typingSpeed);
  }
}

type();

/* ========== Scrolling Function & Auto Close Navbar ========== */

function ScrollToSection() {
  const navbarMenu = document.querySelector('.navbar-menu');
  const navbarToggle = document.querySelector('.navbar-toggle');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = anchor.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }

      if (window.innerWidth <= 880) {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
      }
    });
  });
}

ScrollToSection();

/* ========== Link Functions ========== */

function openAppOrWeb(appUrl, webUrl) {
  const mobile = /Android|iPhone|iPad|BlackBerry|IEMobile/i.test(navigator.userAgent);

  if (mobile) {
    window.location.href = appUrl;
    setTimeout(function () {
      window.open(webUrl, '_blank');
    }, 2000);
  } else {
    window.open(webUrl, '_blank');
  }
}

document.getElementById('github').addEventListener('click', function (e) {
  e.preventDefault();
  openAppOrWeb('github://user/Christian93111', 'https://github.com/Christian93111');
});

document.getElementById('instagram').addEventListener('click', function (e) {
  e.preventDefault();
  openAppOrWeb('instagram://user?username=cdr9311', 'https://www.instagram.com/cdr9311');
});

document.getElementById('discord').addEventListener('click', function (e) {
  e.preventDefault();
  openAppOrWeb('discord://users/1167427800916041780', 'https://discord.com/users/1167427800916041780');
});

document.getElementById('facebook').addEventListener('click', function (e) {
  e.preventDefault();
  openAppOrWeb('fb://profile/100019100501787', 'https://www.facebook.com/CDR9311');
});

document.getElementById('tiktok').addEventListener('click', function (e) {
  e.preventDefault();
  openAppOrWeb('tiktok://user/@cdr9311', 'https://www.tiktok.com/@cdr9311');
});

document.getElementById('tryhackme').addEventListener('click', function (e) {
  e.preventDefault();
  openAppOrWeb('https://tryhackme.com/p/hack4gov003', 'https://tryhackme.com/p/hack4gov003');
});

document.getElementById('picoctf').addEventListener('click', function (e) {
  e.preventDefault();
  openAppOrWeb('https://play.picoctf.org/users/FanAndreas', 'https://play.picoctf.org/users/FanAndreas');
});

document.getElementById('ctflearn').addEventListener('click', function (e) {
  e.preventDefault();
  openAppOrWeb('https://ctflearn.com/user/Fan2K', 'https://ctflearn.com/user/Fan2K');
});

document.getElementById('rootme').addEventListener('click', function (e) {
  e.preventDefault();
  openAppOrWeb('https://www.root-me.org/Fan2K?lang=en', 'https://www.root-me.org/Fan2K?lang=en');
});

/* ========== Interactive Linux Terminal ========== */

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const commandHistory = [];
let historyIndex = -1;

const COMMANDS = {
  help: () => {
    return [
      { text: '', type: 'default' },
      { text: '  Available Commands:', type: 'highlight' },
      { text: '', type: 'default' },
      { text: '  help       -    Show this help message', type: 'accent' },
      { text: '  whoami     -    Display user information', type: 'accent' },
      { text: '  neofetch   -    System information', type: 'accent' },
      { text: '  ls         -    List available files', type: 'accent' },
      { text: '  cat <file> -    Read a file', type: 'accent' },
      { text: '  ping <host> -   Ping a host', type: 'accent' },
      { text: '  date       -    Show current date', type: 'accent' },
      { text: '  pwd        -    Print working directory', type: 'accent' },
      { text: '  cd <dir>   -    Change directory', type: 'accent' },
      { text: '  rm <file>  -    Remove a file', type: 'accent' },
      { text: '  uname      -    System info', type: 'accent' },
      { text: '  echo <text> -    Print text', type: 'accent' },
      { text: '  history    -    Command history', type: 'accent' },
      { text: '  sudo <cmd> -    Run as root', type: 'accent' },
      { text: '  clear      -    Clear the terminal', type: 'accent' },
      { text: '', type: 'default' },
      { text: '', type: 'default' },
    ];
  },

  whoami: () => {
    return [
      { text: '', type: 'default' },
      { text: '  Name     : Christian Dhane Ramizo', type: 'accent' },
      { text: '  Alias    : Fan2K', type: 'accent' },
      { text: '  Role     : IT Student / Developer', type: 'accent' },
      { text: '  School   : STII, Zamboanga Sibugay', type: 'accent' },
      { text: '  Focus    : Cybersecurity & Web Dev', type: 'accent' },
      { text: '  Status   : Beginner', type: 'accent' },
      { text: '', type: 'default' },
    ];
  },

  ls: () => {
    return [
      { text: '', type: 'default' },
      { text: '  about.txt     skills.txt    projects.txt', type: 'accent' },
      { text: '  contact.txt   links.txt     secret.txt', type: 'accent' },
      { text: '', type: 'default' },
    ];
  },

  neofetch: () => {
    const uptime = Math.floor((Date.now() - performance.timeOrigin) / 1000);
    const uptimeMin = Math.floor(uptime / 60);
    const uptimeSec = uptime % 60;
    const resolution = `${window.screen.width}x${window.screen.height}`;
    return [
      { text: '', type: 'default' },
      { text: '  ███████╗ █████╗ ███╗   ██╗██████╗ ██╗  ██╗', type: 'ascii' },
      { text: '  ██╔════╝██╔══██╗████╗  ██║╚════██╗██║ ██╔╝', type: 'ascii' },
      { text: '  █████╗  ███████║██╔██╗ ██║ █████╔╝█████╔╝ ', type: 'ascii' },
      { text: '  ██╔══╝  ██╔══██║██║╚██╗██║██╔═══╝ ██╔═██╗ ', type: 'ascii' },
      { text: '  ██║     ██║  ██║██║ ╚████║███████╗██║  ██╗', type: 'ascii' },
      { text: '  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚══════╝╚═╝  ╚═╝', type: 'ascii' },
      { text: '', type: 'default' },
      { text: '  guest@fan2k', type: 'highlight' },
      { text: '  ─────────────────────', type: 'muted' },
      { text: '  OS         : Linux', type: 'accent' },
      { text: '  Username   : guest', type: 'accent' },
      { text: `  Uptime     : ${uptimeMin}m ${uptimeSec}s`, type: 'accent' },
      { text: `  Resolution : ${resolution}`, type: 'accent' },
      { text: '', type: 'default' },
    ];
  },

  date: () => {
    const now = new Date();
    return [
      { text: '  ' + now.toString(), type: 'accent' },
    ];
  },

  uname: () => {
    return [
      { text: '  Fan2K x86_64 GNU/Linux', type: 'accent' },
    ];
  },

  history: () => {
    if (commandHistory.length === 0) {
      return [{ text: '  No commands in history.', type: 'muted' }];
    }
    return commandHistory.map((cmd, i) => ({
      text: `  ${String(i + 1).padStart(4)}  ${cmd}`,
      type: 'default',
    }));
  },

  clear: () => {
    terminalOutput.innerHTML = '';
    return [];
  },
};

const CAT_FILES = {
  'about.txt': () => [
    { text: '', type: 'default' },
    { text: "  Hi, I'm Christian — a 2nd year BSIT", type: 'default' },
    { text: '  student from STII, Zamboanga Sibugay.', type: 'default' },
    { text: '  Passionate about cybersecurity, web dev,', type: 'default' },
    { text: '  and breaking (then fixing) things.', type: 'default' },
    { text: '', type: 'default' },
  ],
  'skills.txt': () => [
    { text: '', type: 'default' },
    { text: '  Languages : HTML, CSS, JavaScript, PHP,', type: 'default' },
    { text: '              Python, SQL, Bash Script, Assembly Script', type: 'default' },
    { text: '  Frameworks: Bootstrap, Tailwind', type: 'default' },
    { text: '  Tools     : Git, VS Code,', type: 'default' },
    { text: '              Burp Suite, Wireshark, Nmap, Etc...', type: 'default' },
    { text: '  OS        : Linux, Windows', type: 'default' },
    { text: '', type: 'default' },
  ],
  'projects.txt': () => [
    { text: '', type: 'default' },
    { text: '  [01] To Do List       — PHP + Bootstrap', type: 'default' },
    { text: '  [02] Grade Calculator — PHP + CSS', type: 'default' },
    { text: '  [03] ScarFall Alliance— HTML + Bootstrap', type: 'default' },
    { text: '  [04] Hotel Reservation— Python Terminal', type: 'default' },
    { text: '  [05] Pinterest Clone  — HTML/CSS/JS', type: 'default' },
    { text: '  [06] Facebook Clone   — HTML + Tailwind', type: 'default' },
    { text: '  [07] Calculator       — HTML/CSS/JS', type: 'default' },
    { text: '  [08] Coin Flip Game   — HTML/CSS/JS', type: 'default' },
    { text: '  ... and more! Scroll down to see all.', type: 'highlight' },
    { text: '', type: 'default' },
  ],
  'contact.txt': () => [
    { text: '', type: 'default' },
    { text: '  GitHub    : github.com/Christian93111', type: 'default' },
    { text: '  Instagram : @cdr9311', type: 'default' },
    { text: '  Facebook  : CDR9311', type: 'default' },
    { text: '  Discord   : Fan2K', type: 'default' },
    { text: '  TikTok    : @cdr9311', type: 'default' },
    { text: '', type: 'default' },
    { text: '  Or scroll down to the contact form!', type: 'highlight' },
    { text: '', type: 'default' },
  ],
  'links.txt': () => [
    { text: '', type: 'default' },
    { text: '  CTF Platforms:', type: 'highlight' },
    { text: '    • TryHackMe  — tryhackme.com/p/hack4gov003', type: 'default' },
    { text: '    • PicoCTF    — play.picoctf.org', type: 'default' },
    { text: '    • CTFlearn   — ctflearn.com/user/Fan2K', type: 'default' },
    { text: '    • RootMe     — root-me.org/Fan2K', type: 'default' },
    { text: '', type: 'default' },
  ],
  'secret.txt': () => [
    { text: '', type: 'default' },
    { text: '  FLAG FOUND!', type: 'warn' },
    { text: '', type: 'default' },
    { text: '  Fan2K{y0u_f0und_th3_s3cr3t_f1l3}', type: 'highlight' },
    { text: '', type: 'default' },
  ],
};

function processCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) return [];

  commandHistory.push(trimmed);
  historyIndex = commandHistory.length;

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // cat command
  if (cmd === 'cat') {
    if (args.length === 0) {
      return [{ text: '  cat: missing file operand', type: 'warn' }];
    }
    const filename = args[0].toLowerCase();
    if (CAT_FILES[filename]) {
      return CAT_FILES[filename]();
    }
    return [{ text: `  cat: ${args[0]}: No such file or directory`, type: 'warn' }];
  }

  // echo command
  if (cmd === 'echo') {
    const text = args.join(' ');
    return [{ text: '  ' + text, type: 'default' }];
  }

  // ping command (dynamic — lines appear with delays)
  if (cmd === 'ping') {
    const host = args[0] || 'localhost';
    const pingCount = 4;
    const times = [];

    addOutputLine(`  PING ${host} (127.0.0.1) 56(84) bytes of data.`, 'default');
    scrollTerminal();
    terminalInput.disabled = true;

    for (let i = 1; i <= pingCount; i++) {
      const time = (Math.random() * 0.9 + 0.1).toFixed(2);
      times.push(parseFloat(time));

      setTimeout(() => {
        addOutputLine(`  64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${time} ms`, 'accent');
        scrollTerminal();

        if (i === pingCount) {
          setTimeout(() => {
            const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
            const min = Math.min(...times).toFixed(2);
            const max = Math.max(...times).toFixed(2);
            addOutputLine('', 'default');
            addOutputLine(`  --- ${host} ping statistics ---`, 'default');
            addOutputLine(`  ${pingCount} packets transmitted, ${pingCount} received, 0% packet loss`, 'highlight');
            addOutputLine(`  rtt min/avg/max = ${min}/${avg}/${max} ms`, 'accent');
            scrollTerminal();
            terminalInput.disabled = false;
            terminalInput.focus();
          }, 300);
        }
      }, i * 600);
    }

    return [];
  }

  // sudo command
  if (cmd === 'sudo') {
    return [
      { text: '', type: 'default' },
      { text: '  [sudo] password for guest: ********', type: 'warn' },
      { text: '  Nice try! But you don\'t have root privileges here.', type: 'warn' },
      { text: '', type: 'default' },
    ];
  }

  // rm command
  if (cmd === 'rm') {
    return [
      { text: '  rm: permission denied. This is a read-only filesystem!', type: 'warn' },
      { text: '  Nice try though', type: 'warn' },
    ];
  }

  // cd command
  if (cmd === 'cd') {
    return [
      { text: '  You\'re already where you need to be.', type: 'accent' },
    ];
  }

  // pwd command
  if (cmd === 'pwd') {
    return [{ text: '  /home/guest/portfolio', type: 'accent' }];
  }

  // built-in commands
  if (COMMANDS[cmd]) {
    return COMMANDS[cmd]();
  }

  // unknown command
  return [
    { text: `  bash: ${cmd}: command not found`, type: 'warn' },
    { text: "  Type 'help' for a list of available commands.", type: 'muted' },
  ];
}

function addOutputLine(text, type) {
  const line = document.createElement('div');
  line.classList.add('terminal-output-line');

  const span = document.createElement('span');

  if (type === 'ascii') {
    span.classList.add('ascii-art');
  } else {
    span.classList.add('output-text');
    if (type === 'accent') span.classList.add('accent');
    if (type === 'highlight') span.classList.add('highlight');
    if (type === 'warn') span.classList.add('warn');
    if (type === 'muted') {
      span.style.color = 'var(--text-muted)';
    }
  }

  span.textContent = text;
  line.appendChild(span);
  terminalOutput.appendChild(line);
}

function addCommandLine(command) {
  const line = document.createElement('div');
  line.classList.add('terminal-output-line');

  const promptSpan = document.createElement('span');
  promptSpan.classList.add('prompt-text');
  promptSpan.textContent = 'guest@fan2k:~$ ';

  const cmdSpan = document.createElement('span');
  cmdSpan.classList.add('cmd-text');
  cmdSpan.textContent = command;

  line.appendChild(promptSpan);
  line.appendChild(cmdSpan);
  terminalOutput.appendChild(line);
}

function scrollTerminal() {
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = terminalInput.value;
    terminalInput.value = '';

    addCommandLine(command);

    const output = processCommand(command);
    output.forEach(line => {
      addOutputLine(line.text, line.type);
    });

    scrollTerminal();
  }

  // Command history navigation
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
    }
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      terminalInput.value = '';
    }
  }
});

// Click terminal body to focus input
document.querySelector('.terminal-window').addEventListener('click', () => {
  terminalInput.focus();
});