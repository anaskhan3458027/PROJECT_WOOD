document.addEventListener("DOMContentLoaded", function() {
    // Add 20 rows when the page loads
    for (let i = 0; i < 20; i++) {
        addRow();
    }
});

// Function to calculate all rows when the "Calculate All" button is clicked
document.getElementById('calculate-all').addEventListener('click', function() {
    const height = parseFloat(document.getElementById("height").value);

    // Get all rows from the table body
    const rows = document.querySelectorAll("#data-table tbody tr");

    let totalPieces = 0, totalD = 0, totalD144 = 0;

    // Loop through each row
    rows.forEach((row, index) => {
        const length = parseFloat(row.cells[1].querySelector('input').value);
        const breadth = parseFloat(row.cells[2].querySelector('input').value);
        const pieces = parseFloat(row.cells[3].querySelector('input').value);

        // Perform calculation for D (Length * Breadth * Height * No of Pieces)
        if (!isNaN(length) && !isNaN(breadth) && !isNaN(height) && !isNaN(pieces)) {
            const d = length * breadth * height * pieces;
            row.cells[4].querySelector('input').value = d.toFixed(2); // Update D
            totalD += d;

            // Calculate D/144 with 4 decimal precision
            const d144 = d / 144;
            row.cells[5].querySelector('input').value = d144.toFixed(4); // Update D/144
            totalD144 += d144;
            totalPieces += pieces;
        } else {
            alert(`Please enter valid numbers in the required fields for row ${index + 1}`);
        }
    });

    // Insert or update the summation row in the footer
    updateSummationRow(totalPieces, totalD, totalD144);
});

// Function to add a new row to the table
function addRow() {
    const table = document.getElementById("data-table").getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length + 1;

    // Create a new row with the same structure
    const newRow = `
        <tr>
            <td>${rowCount}</td>
            <td><input type="number" placeholder="Length"></td>
            <td><input type="number" placeholder="Breadth"></td>
            <td><input type="number" placeholder="No of Pieces" value="10"></td>
            <td><input type="number" disabled></td>
            <td><input type="number" disabled></td>
        </tr>
    `;

    // Append the new row to the table body
    table.insertAdjacentHTML('beforeend', newRow);
}

// Function to update the summation row
function updateSummationRow(totalPieces, totalD, totalD144) {
    const tfoot = document.querySelector("#data-table tfoot");
    tfoot.innerHTML = `
        <tr>
            <td colspan="3">Total</td>
            <td>${totalPieces}</td>
            <td>${totalD.toFixed(2)}</td>
            <td>${totalD144.toFixed(4)}</td>
        </tr>
    `;
}

// Function to print the table
function printTable() {
    window.print();
}
