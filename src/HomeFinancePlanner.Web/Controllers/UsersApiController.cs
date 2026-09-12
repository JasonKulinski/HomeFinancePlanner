using HomeFinancePlanner.Data;
using HomeFinancePlanner.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFinancePlanner.Web.Controllers;

[ApiController]
[Route("api/users")]
public class UsersApiController : ControllerBase
{
    private readonly AppDbContext _db;

    public UsersApiController(AppDbContext db)
    {
        _db = db;
    }

    /// <summary>
    /// POST /api/users — Add a new user to the database.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] CreateUserRequest request)
    {
        if (string.IsNullOrWhiteSpace(request?.Name))
        {
            return BadRequest("Name is required.");
        }

        // Check if user already exists
        var existingUser = await _db.Users
            .FirstOrDefaultAsync(u => u.Name == request.Name);

        if (existingUser != null)
        {
            return BadRequest($"User with name '{request.Name}' already exists.");
        }

        var user = new User { Name = request.Name };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    /// <summary>
    /// GET /api/users/{id} — Get a user by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _db.Users
            .Include(u => u.LedgerEntries)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    /// <summary>
    /// GET /api/users?name=John — Get a user by name.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetUserByName([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Name is required.");
        }

        var user = await _db.Users
            .Include(u => u.LedgerEntries)
            .FirstOrDefaultAsync(u => u.Name == name);

        if (user == null)
        {
            return NotFound($"User with name '{name}' not found.");
        }

        return Ok(user);
    }
}

public class CreateUserRequest
{
    public string? Name { get; set; }
}
