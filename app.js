
const ROW = 29;
const COL = 29;
const TIME_VID = 10;
const TIME_PATH = 100;
const NODE_START = { i: 10, j: 0 };
const NODE_END = { i: 13, j: 28 };

let eVisited = [];
let ePath = [];
let eCellPath = [];

const CELL_TYPE = {
  empty: 0,
  wall: 1,
  start: 2,
  end: 3,
  mid: 4,
}
// Initial grid with empty cell.
const grid = createGrid({ init: 0 });
function createGrid({ init }, row = ROW, col = COL) {
  const grid = new Array(ROW);
  for (let index = 0; index < grid.length; index++) {
    grid[index] = new Array(COL);
    for (let i = 0; i < grid[index].length; i++) {
      grid[index][i] = init;
    }
  }
  return grid;
}

function example() {
  let temp = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]];

    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        grid[i][j] = temp[i][j];
      }
    }
    NODE_START.i = 10;
    NODE_START.j = 0 ;
    NODE_END.i = 13;
    NODE_END.j = 28;
}

// Set start node.
grid[NODE_START.i][NODE_START.j] = CELL_TYPE.start;
// Set end node.
grid[NODE_END.i][NODE_END.j] = CELL_TYPE.end;
// 0-chưa đi qua| 1-đã đi qua | 2-path line node
const vid = createGrid({ init: 0 });

const MyComponent = {
  data() {
    return {
      width: COL,
      height: ROW,
      grid,
      vid,
      counter: 0,
      styleCell: 0,
      isMovingStart: false, // Moving start.
      isMovingEnd: false, // Moving end.
      isMovingMid: false, // Moving mid.
      isEraser: false,
      indexMidMoving: null,
      midMoving: null,
      isPressing: false, // True when press and hold mouse.
      realTimeAble: false,  // After run visual it is true.
      isRunning: false, // When visual running it is true, after completed it is false.
      timeOutId: null,
      start: { ...NODE_START },
      end: { ...NODE_END },
      mids: [],
    }
  },

  mounted() {
  },
  computed: {
    runVisualInRealTime() {
      return !this.isRunning && this.realTimeAble && (this.isMovingEnd || this.isMovingStart || this.isMovingMid);
    },
    canRunVisualBtn() {
      return this.start !== null && this.end !== null;
    },
    isSelect() {
      return (!this.isEraser && !this.isRunning) && (this.styleCell !== CELL_TYPE.wall && this.styleCell !== CELL_TYPE.mid
        || this.isMovingEnd || this.isMovingStart || this.isMovingMid);
    },
    isWall() {
      return this.styleCell === CELL_TYPE.wall && (!this.isEraser && !this.isRunning)
        && !(this.isMovingEnd || this.isMovingStart || this.isMovingMid);
    },
    isMid() {
      return this.styleCell === CELL_TYPE.mid && (!this.isEraser && !this.isRunning)
        && !(this.isMovingEnd || this.isMovingStart || this.isMovingMid);
    }
  },
  methods: {
    setCellStyle(m) {
      this.styleCell = m;
      this.isEraser = false;
    },
    toggleEraser() {
      this.isEraser = !this.isEraser;
      if (this.isEraser) {
        this.styleCell = CELL_TYPE.empty;
      }
    },
    resetApp() {
      console.log('ddd')
      // for (let r = 0; r < this.grid.length; r++) {
      //   for (let c = 0; c < this.grid[0].length; c++) {
      //     if (this.grid[r][c] !== CELL_TYPE.mid) {
      //       this.grid[r][c] = CELL_TYPE.empty;
      //     }
      //   }
      // }
      // this.grid[10][0] = CELL_TYPE.start;
      // this.grid[13][28] = CELL_TYPE.end;
      example();
      this.start = { i: 10, j: 0 };
      this.end = { i: 13, j: 28 };
      this.mids = [];
      this.realTimeAble = false;
      this.clearDomClass();
    },
    onMountDown(row, col) {

      const type = grid[row][col];
      let styleCell = this.styleCell;
      this.isPressing = true;

      if (this.isEraser) {
        switch (type) {
          case CELL_TYPE.start:
            this.start = null;
            break;
          case CELL_TYPE.end:
            this.end = null;
            break;
          case CELL_TYPE.mid:
            this.mids = this.mids.filter(m => m.i !== row && m.j !== col);
            break;
          default:
            break;
        }
        this.grid[row][col] = CELL_TYPE.empty;
        return;
      }

      if (type === CELL_TYPE.start) {
        this.isMovingStart = !this.isMovingStart;
        styleCell = CELL_TYPE.start;
      }
      else if (type === CELL_TYPE.end) {
        this.isMovingEnd = !this.isMovingEnd;
        styleCell = CELL_TYPE.end;
      }

      if (styleCell === CELL_TYPE.mid && !this.isMovingMid) {

        let indexMidMoving = this.mids.findIndex(m => m.i === row && m.j === col);
        if (indexMidMoving === -1) {
          this.mids.push({ i: row, j: col });
        }
      }

      if (type === CELL_TYPE.mid) {
        this.isMovingMid = !this.isMovingMid;
        styleCell = CELL_TYPE.mid;
        if (this.isMovingMid) {
          this.indexMidMoving = this.mids.findIndex(m => m.i === row && m.j === col);
          this.midMoving = this.mids.find(m => m.i === row && m.j === col);
        } else {

          this.mids[this.indexMidMoving] = this.midMoving;
          this.indexMidMoving = null;
          this.midMoving = null;
        }
      }

      this.grid[row][col] = styleCell;
    },
    onMountUp(row, col) {
      this.isPressing = false;
    },
    onMountOver(row, col) {

      if (this.isRunning) {
        return;
      }

      const type = grid[row][col];
      const { i: si, j: sj } = this.start;
      const { i: ei, j: ej } = this.end;

      if (type === CELL_TYPE.wall) {
        this.grid[si][sj] = CELL_TYPE.start;
        this.grid[ei][ej] = CELL_TYPE.end;
        return;
      }

      if (this.isPressing && this.styleCell === CELL_TYPE.wall) {
        this.grid[row][col] = CELL_TYPE.wall;
        return;
      }

      if (this.isMovingStart) {
        if (type === CELL_TYPE.empty) {
          this.grid[si][sj] = CELL_TYPE.empty;
          this.grid[row][col] = CELL_TYPE.start;
          this.start = { i: row, j: col };
        } else {
          return;
        }
      }
      else if (this.isMovingEnd) {
        if (type === CELL_TYPE.empty) {
          this.grid[ei][ej] = CELL_TYPE.empty;
          this.grid[row][col] = CELL_TYPE.end;
          this.end = { i: row, j: col };
        } else {
          return;
        }
      }
      else if (this.isMovingMid) {
        if (type === CELL_TYPE.empty) {
          const { i, j } = this.midMoving;
          this.grid[i][j] = CELL_TYPE.empty;
          this.grid[row][col] = CELL_TYPE.mid;
          this.midMoving = { i: row, j: col };
          this.mids[this.indexMidMoving] = this.midMoving;
        }
      }

      if (this.runVisualInRealTime) {
        if (this.timeOutId)
          clearTimeout(this.timeOutId);
        this.timeOutId = setTimeout(() => {
          this.runVisual();
        }, 600);
      }
    },
    clearDomClass() {
      eVisited.forEach(e => e.className = "");
      ePath.forEach(e => e.className = "");
      eCellPath.forEach(e => e.className = "empty cell")
      eVisited = [];
      ePath = [];
    },
    runVisual() {
      this.clearDomClass();

      this.isRunning = true;

      const positions = [this.start, ...this.mids, this.end];
      // let timeOff = 0;
      let promise = Promise.resolve();
      for (let i = 0, n = positions.length - 1; i < n; i++) {
        const [start, end] = [positions[i], positions[i + 1]];
        if (this.runVisualInRealTime) {
          this.bFS(start, end, 'color' + i)
            .then((path) => {
              this.linePath(path, start, end)
                .then(() => {
                  if (i == n - 1) {
                    this.isRunning = false;
                    this.realTimeAble = true;
                  }
                });
            });
        } else {
          promise = promise.then(() => {
            return new Promise(resolve => {
              this.bFS(start, end, 'color' + i)
                .then((path) => {
                  this.linePath(path, start, end)
                    .then(() => {
                      if (i == n - 1) {
                        this.isRunning = false;
                        this.realTimeAble = true;
                      }
                      resolve();
                    });
                });
            })
          });
        }

      }
    },
    bFS(start, end, color) {
      let q = [];
      let path = new Map();

      let time = 0;
      q.push(start);
      const vid = createGrid({ init: false });

      vid[start.i][start.j] = true;
      let promise = Promise.resolve();
      while (q.length > 0) {
        let current = q.shift();
        let neighbors = this.getNeighbors(current.i, current.j);
        let noneVidNeighbors = neighbors.filter(({ i, j }) => !vid[i][j])

        for (const { i, j } of noneVidNeighbors) {
          q.push({ i, j });
          vid[i][j] = true;

          path.set(i + ':' + j, current);

          if (i === end.i && j === end.j) {
            promise = promise.then(() => {
              return new Promise(resolve => {
                setTimeout(() => {
                  return resolve(path);
                }, time);
              })
            })

            return promise;
          }
        }

        if (this.realTimeAble) {
          for (const { i, j } of noneVidNeighbors) {
            if (i !== end.i || j !== end.j) {

              let e = document.getElementById(`c_${i}_${j}`);
              e = e.getElementsByTagName('span')[0];
              e.classList.add('visited');
              e.classList.add(color);
              // cache.
              eVisited.push(e);
            }
          }
        }
        else {
          promise = promise.then(() => {
            new Promise(resolve =>
              setTimeout(function setVisitedNode() {
                for (const { i, j } of noneVidNeighbors) {
                  if (i !== end.i || j !== end.j) {
                    let e = document.getElementById(`c_${i}_${j}`);
                    e = e.getElementsByTagName('span')[0];
                    e.classList.add('visited');
                    e.classList.add(color);
                    // cache.
                    eVisited.push(e);
                  }
                }
                resolve();
              }, time += TIME_VID)
            );
          });
        }
      }

      return promise.then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(path)
          })
        })
      })

    },
    linePath(path = new Map(), start, end) {
      let prev = path.get(end.i + ':' + end.j);

      let pathLine = [end];
      let time = this.realTimeAble ? 0 : TIME_PATH;

      while (prev !== undefined) {
        pathLine.push(prev);
        prev = path.get(prev.i + ':' + prev.j);
      }

      pathLine = pathLine.reverse();

      let promise = Promise.resolve();

      if (this.realTimeAble) {
        for (let node = 1, n = pathLine.length - 1; node < n; node++) {
          let current = pathLine[node];
          let next = pathLine[node + 1];

          setTimeout(() => {
            let eCurrent = document.getElementById(`c_${current.i}_${current.j}`);
            let eNext = document.getElementById(`c_${next.i}_${next.j}`);
            let classPath = this.getPathBorderClass(current, next);

            if (classPath[1])
              eNext.classList.add(classPath[1]);
            if (classPath[0]) {
              eCurrent.classList.add(classPath[0]);
            }

            let span = eCurrent.getElementsByTagName('span')[0];
            span.classList.add('path');
            if (node == n - 1) {
              let arrow = this.getArrowClass(current, next);
              span.classList.add('arrow-' + arrow);
            }
            // Cache.
            ePath.push(span);
            eCellPath.push(eCurrent);

          });
        }
      } else {
        for (let node = 1, n = pathLine.length - 1; node < n; node++) {
          let current = pathLine[node];
          let next = pathLine[node + 1];

          promise = promise.then(() =>
            new Promise(resolve => {
              setTimeout(() => {
                let eCurrent = document.getElementById(`c_${current.i}_${current.j}`);
                let eNext = document.getElementById(`c_${next.i}_${next.j}`);

                let classPath = this.getPathBorderClass(current, next);
                if (classPath[1])
                  eNext.classList.add(classPath[1]);
                if (classPath[0])
                  eCurrent.classList.add(classPath[0]);


                let span = eCurrent.getElementsByTagName('span')[0];

                span.classList.add('path');
                if (node == n - 1) {
                  let arrow = this.getArrowClass(current, next);
                  span.classList.add('arrow-' + arrow);
                }
                ePath.push(span);
                eCellPath.push(eCurrent);

                resolve();
              }, 0);
            })
          )
        }
      }


      return promise;
    },
    getPathBorderClass(current, next) {
      //top
      if (next.i > current.i)
        return ['', 'bottom'];
      // bottom
      if (next.i < current.i)
        return ['bottom', ''];
      // left
      if (next.j < current.j)
        return ['left', ''];
      // right
      if (next.j > current.j)
        return ['', 'left'];
    },
    getArrowClass(current, next) {
      //top
      if (next.i < current.i)
        return 'top';
      // bottom
      if (next.i > current.i)
        return 'bottom';
      // left
      if (next.j < current.j)
        return 'left';
      // right
      if (next.j > current.j)
        return 'right';
    },
    getNeighbors(i, j) {
      const h = this.grid.length;
      const w = this.grid[0].length;

      const neighbors = [];
      if (j + 1 < w && this.isEmpty(i, j + 1)) {
        neighbors.push({ i, j: j + 1 });
      }
      if (j - 1 >= 0 && this.isEmpty(i, j - 1)) {
        neighbors.push({ i, j: j - 1 });
      }
      if (i - 1 >= 0 && this.isEmpty(i - 1, j)) {
        neighbors.push({ i: i - 1, j });
      }

      if (i + 1 < h && this.isEmpty(i + 1, j)) {
        neighbors.push({ i: i + 1, j });
      }

      return neighbors;
    },
    isEmpty(i, j) {
      const styleCell = this.grid[i][j]
      return styleCell !== CELL_TYPE.wall
    },
    getIndexPath(i, j) {
      let s = i * (this.width) + j;
      return s;
    },
    getLocationFromIndexPath(index) {
      let j = index % this.width;
      let i = (index - j) / this.width;
      return { i, j };
    }
  }
}

// Define a new global component called button-counter
const app = Vue.createApp(MyComponent);
app.mount('#app')
